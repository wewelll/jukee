defmodule Jukee.Players do
  @moduledoc """
  The Players context.
  """

  import Ecto.Query, warn: false
  alias Jukee.Repo

  alias Jukee.Players.PlayerTrack
  alias Jukee.Players.Player
  alias JukeeWeb.PlayerView
  alias Jukee.TrackSearch
  alias Jukee.Tracks

  @doc """
  Returns the list of players.

  ## Examples

      iex> list_players()
      [%Player{}, ...]

  """
  def list_players do
    Repo.all(Player)
  end

  @doc """
  Gets a single player.

  Raises `Ecto.NoResultsError` if the Player does not exist.

  ## Examples

      iex> get_player!(123)
      %Player{}

      iex> get_player!(456)
      ** (Ecto.NoResultsError)

  """
  def get_player!(id) do
    player_tracks_query = from pt in PlayerTrack, order_by: pt.index
    Player
    |> Repo.get!(id)
    |> Repo.preload([
        player_tracks: {player_tracks_query, [:track]},
        current_player_track: [:track],
      ])
  end

  @doc """
  Creates a player.

  ## Examples

      iex> create_player(%{field: value})
      {:ok, %Player{}}

      iex> create_player(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_player(attrs \\ %{}) do
    %Player{}
    |> Player.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a player.

  ## Examples

      iex> update_player(player, %{field: new_value})
      {:ok, %Player{}}

      iex> update_player(player, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_player(%Player{} = player, attrs) do
    player
    |> Player.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Player.

  ## Examples

      iex> delete_player(player)
      {:ok, %Player{}}

      iex> delete_player(player)
      {:error, %Ecto.Changeset{}}

  """
  def delete_player(%Player{} = player) do
    Repo.delete(player)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking player changes.

  ## Examples

      iex> change_player(player)
      %Ecto.Changeset{source: %Player{}}

  """
  def change_player(%Player{} = player) do
    Player.changeset(player, %{})
  end

  def play_track_on_player(player_id, player_track_index, track_progress \\ -2000) do
    player_track = Repo.get_by(PlayerTrack, [player_id: player_id, index: player_track_index])
    get_player!(player_id)
    |> Player.changeset(%{playing: true, track_progress: track_progress})
    |> Ecto.Changeset.put_assoc(:current_player_track, player_track)
    |> Repo.update()
    broadcast_player_update(player_id)
  end

  def delete_track_on_player(player_id, player_track_index) do
    player_track = Repo.get_by(PlayerTrack, [player_id: player_id, index: player_track_index])
    player_track
    |> Repo.delete()
    broadcast_player_update(player_id)
  end

  def play(player_id) do
    get_player!(player_id)
    |> Player.changeset(%{playing: true})
    |> Repo.update()
    broadcast(player_id, "player_update", %{ playing: true })
  end

  def pause(player_id) do
    get_player!(player_id)
    |> Player.changeset(%{playing: false})
    |> Repo.update()
    broadcast(player_id, "player_update", %{ playing: false })
  end

  def toggle_pause(player_id) do
    player = get_player!(player_id)
    case player.playing do
      true -> pause(player_id)
      false -> play(player_id)
    end
  end

  def seek(player_id, to) do
    get_player!(player_id)
    |> Player.changeset(%{track_progress: to})
    |> Repo.update()
    broadcast(player_id, "player_update", %{ trackProgress: to })
  end

  def next(player_id) do
    case get_next_track_index(player_id) do
      nil ->
        case has_autoplay(player_id) do
          false -> pause(player_id)
          true ->
            add_related_tracks(player_id, 3)
        end
      next_track_index -> play_track_on_player(player_id, next_track_index)
    end
  end

  def previous(player_id) do
    case get_previous_track_index(player_id) do
      nil -> seek(player_id, 0)
      next_track_index -> play_track_on_player(player_id, next_track_index)
    end
  end

  def set_autoplay(player_id, autoplay) do
    get_player!(player_id)
    |> Player.changeset(%{autoplay: autoplay})
    |> Repo.update()
    broadcast(player_id, "player_update", %{ autoplay: autoplay })
  end

  defp has_autoplay(player_id) do
    from(p in Player, where: p.id == ^player_id, select: p.autoplay)
    |> Repo.one()
  end

  def players_progress_update(progress_duration \\ 1000) do
    ## base query for players that should either progress or go to the next song
    base_query = from(
      p in Player,
      join: current_player_track in assoc(p, :current_player_track),
      join: current_track in assoc(current_player_track, :track),
      where: p.playing == true and not(is_nil(p.current_player_track_id))
    )

    ## base query for players that should progress
    should_progress_base_query = from(
      [p, current_player_track, current_track] in base_query,
      where: p.track_progress <= current_track.duration
    )

    ## get the player ids that should progress
    progressing_player_ids = from(
      p in should_progress_base_query,
      select: {p.id, p.track_progress}
    )
    |> Repo.all()

    ## update all the players that should progress
    from(
      p in should_progress_base_query,
      update: [inc: [track_progress: ^progress_duration]]
    )
    |> Repo.update_all([])

    ## broadcast the player progress on every player channel
    Enum.each progressing_player_ids, fn {player_id, track_progress} ->
      broadcast(player_id, "player_update", %{ trackProgress: track_progress + progress_duration })
    end

    ## get all the tracks that should go next
    should_next_player_ids = from(
      [p, current_player_track, current_track] in base_query,
      where: p.track_progress > current_track.duration,
      select: p.id
    )
    |> Repo.all()

    ## next each track that should go next
    Enum.each should_next_player_ids, fn player_id ->
      next(player_id)
    end
  end

  def broadcast_player_update(player_id) do
    player = get_player!(player_id)
    broadcast player_id, "player_update", PlayerView.render("player.json", %{player: player})
  end

  def broadcast(player_id, event, payload) do
    JukeeWeb.Endpoint.broadcast "player:" <> to_string(player_id), event, payload
  end

  def add_related_tracks(player_id, tracks_number \\ 5) do
    current_track = get_current_track(player_id)
    related_tracks = TrackSearch.get_related_tracks(current_track.provider, current_track.external_id, tracks_number)
    Enum.each related_tracks, fn related_track ->
      add_track(player_id, related_track)
    end
  end

  @doc """
  Returns the list of players_tracks.

  ## Examples

      iex> list_players_tracks()
      [%PlayerTrack{}, ...]

  """
  def list_players_tracks do
    Repo.all(PlayerTrack)
  end

  @doc """
  Gets a single player_track.

  Raises `Ecto.NoResultsError` if the Player track does not exist.

  ## Examples

      iex> get_player_track!(123)
      %PlayerTrack{}

      iex> get_player_track!(456)
      ** (Ecto.NoResultsError)

  """
  def get_player_track!(id), do: Repo.get!(PlayerTrack, id)

  @doc """
  Creates a player_track.

  ## Examples

      iex> create_player_track(%{field: value})
      {:ok, %PlayerTrack{}}

      iex> create_player_track(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """

  defp get_current_track(player_id) do
    from(
      p in Player,
      join: current_player_track in assoc(p, :current_player_track),
      join: current_track in assoc(current_player_track, :track),
      where: p.id == ^player_id,
      select: current_track
    )
    |> Repo.one()
  end

  defp get_highest_track_index(player_id) do
    from(pt in PlayerTrack, where: pt.player_id == ^player_id, select: max(pt.index))
    |> Repo.one() || 0
  end

  defp get_next_track_index(player_id) do
    from(
      pt in PlayerTrack,
      join: player in assoc(pt, :player),
      join: current_pt in assoc(player, :current_player_track),
      where: pt.player_id == ^player_id and pt.index > current_pt.index,
      select: min(pt.index)
    )
    |> Repo.one()
  end

  defp get_previous_track_index(player_id) do
    {
      previous_track_index,
      current_track_progress,
      current_track_index,
    } = from(
      pt in PlayerTrack,
      join: player in assoc(pt, :player),
      join: current_pt in assoc(player, :current_player_track),
      where: pt.player_id == ^player_id and pt.index < current_pt.index,
      group_by: [player.id, current_pt.id],
      select: {max(pt.index), player.track_progress, current_pt.index}
    )
    |> Repo.one()

    if current_track_progress > 3000 do
      current_track_index
    else
      previous_track_index
    end
  end

  def add_track(player_id, track) do
    case Tracks.get_or_create_track(track) do
      {:ok, track} ->
        %PlayerTrack{}
        |> PlayerTrack.changeset(%{
          player_id: player_id,
          track_id: track.id,
          index: get_highest_track_index(player_id) + 1
        })
        |> Repo.insert!()
        broadcast_player_update(player_id)
      err -> err
    end
  end

  def create_player_track(attrs \\ %{}) do
    %PlayerTrack{}
    |> PlayerTrack.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a player_track.

  ## Examples

      iex> update_player_track(player_track, %{field: new_value})
      {:ok, %PlayerTrack{}}

      iex> update_player_track(player_track, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_player_track(%PlayerTrack{} = player_track, attrs) do
    player_track
    |> PlayerTrack.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a PlayerTrack.

  ## Examples

      iex> delete_player_track(player_track)
      {:ok, %PlayerTrack{}}

      iex> delete_player_track(player_track)
      {:error, %Ecto.Changeset{}}

  """
  def delete_player_track(%PlayerTrack{} = player_track) do
    Repo.delete(player_track)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking player_track changes.

  ## Examples

      iex> change_player_track(player_track)
      %Ecto.Changeset{source: %PlayerTrack{}}

  """
  def change_player_track(%PlayerTrack{} = player_track) do
    PlayerTrack.changeset(player_track, %{})
  end
end
