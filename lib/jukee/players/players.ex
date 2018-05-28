defmodule Jukee.Players do
  @moduledoc """
  The Players context.
  """

  import Ecto.Query, warn: false
  alias Jukee.Repo

  alias Jukee.Players.PlayerTrack
  alias Jukee.Players.Player

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
    Player
    |> Repo.get!(id)
    |> Repo.preload([
        player_tracks: [:track],
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
  end

  def play(player_id) do
    get_player!(player_id)
    |> Player.changeset(%{playing: true})
    |> Repo.update()
  end

  def pause(player_id) do
    get_player!(player_id)
    |> Player.changeset(%{playing: false})
    |> Repo.update()
  end

  def seek(player_id, to) do
    get_player!(player_id)
    |> Player.changeset(%{track_progress: to})
    |> Repo.update()
  end

  def next(player_id) do
    case get_next_track_index(player_id) do
      nil -> pause(player_id)
      next_track_index -> play_track_on_player(player_id, next_track_index)
    end
  end

  def is_playing(player_id) do
    from(p in Player, where: p.id == ^player_id, select: p.playing)
    |> Repo.one()
  end

  def get_track_progress(player_id) do
    from(p in Player, where: p.id == ^player_id, select: p.track_progress)
    |> Repo.one()
  end

  def get_progress_action(player_id) do
    result = from(
      p in Player,
      where: p.id == ^player_id,
      join: current_player_track in assoc(p, :current_player_track),
      join: current_track in assoc(current_player_track, :track),
      select: { p.playing, p.track_progress, current_track.duration }
    )
    |> Repo.one()

    if result !== nil do
      { playing, track_progress, current_track_duration } = result
      if playing do
        if track_progress > current_track_duration do
          :next
        else
          :progress
        end
      else
        :nothing
      end
    else
      :nothing
    end
  end

  def progress(player_id, progress_duration \\ 1000) do
    from(p in Player, where: p.id == ^player_id, update: [inc: [track_progress: ^progress_duration]])
    |> Repo.update_all([])
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

  def add_track(player_id, track) do
    %PlayerTrack{}
    |> PlayerTrack.changeset(%{
      player_id: player_id,
      track_id: track.id,
      index: get_highest_track_index(player_id) + 1
    })
    |> Repo.insert!()
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
