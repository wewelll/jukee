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

  def play_track_on_player(player_id, player_track_index) do
    player_track = Repo.get_by!(PlayerTrack, [player_id: player_id, index: player_track_index])
    player = get_player!(player_id)
    player
    |> Player.changeset(%{playing: true, progress: 0})
    |> Ecto.Changeset.put_assoc(:current_player_track, player_track)
    |> Repo.update()
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
