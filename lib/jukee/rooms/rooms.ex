defmodule Jukee.Rooms do
  @moduledoc """
  The Rooms context.
  """

  import Ecto.Query, warn: false
  alias Jukee.Repo

  alias Jukee.Rooms.Room
  alias Jukee.Players
  alias Jukee.Players.Player

  @doc """
  Returns the list of rooms.

  ## Examples

      iex> list_rooms()
      [%Room{}, ...]

  """
  def list_rooms do
    Room
    |> Repo.all()
    |> Repo.preload(:player)
  end

  def list_rooms_created_by(user) do
    from(
      r in Room, where: r.creator_id == ^user.id
    )
    |> Repo.all()
  end

  def list_rooms_visited_by(user) do
    from(
      r in Room,
      join: player in assoc(r, :player),
      join: player_connection in assoc(player, :player_connections),
      join: user in assoc(player_connection, :user),
      where: user.id == ^user.id,
      group_by: r.id
    )
    |> Repo.all()
  end

  @doc """
  Gets a single room.

  Raises `Ecto.NoResultsError` if the Room does not exist.

  ## Examples

      iex> get_room!(123)
      %Room{}

      iex> get_room!(456)
      ** (Ecto.NoResultsError)

  """
  def get_room!(id) do
    Room
    |> Repo.get!(id)
    |> Repo.preload(:player)
  end

    @doc """
  Gets a single room by url.

  Raises `Ecto.NoResultsError` if the Room does not exist.

  ## Examples

      iex> get_room_by_url!('toto')
      %Room{}

      iex> get_room_by_url!('this-url-does-not-exists')
      ** (Ecto.NoResultsError)

  """
  def get_room_by_url!(url) do
    Room
    |> Repo.get_by!(url: url)
    |> Repo.preload(:player)
  end

  @doc """
  Creates a room.

  ## Examples

      iex> create_room(%{field: value})
      {:ok, %Room{}}

      iex> create_room(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_room(attrs \\ %{}, current_user) do
    {:ok, player} = Players.create_player()
    %Room{}
    |> Room.changeset(attrs)
    |> Ecto.Changeset.put_assoc(:creator, current_user)
    |> Ecto.Changeset.put_assoc(:player, player)
    |> Repo.insert()
  end

  @doc """
  Updates a room.

  ## Examples

      iex> update_room(room, %{field: new_value})
      {:ok, %Room{}}

      iex> update_room(room, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_room(%Room{} = room, attrs) do
    room
    |> Room.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Room.

  ## Examples

      iex> delete_room(room)
      {:ok, %Room{}}

      iex> delete_room(room)
      {:error, %Ecto.Changeset{}}

  """
  def delete_room(%Room{} = room) do
    Repo.delete(room)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking room changes.

  ## Examples

      iex> change_room(room)
      %Ecto.Changeset{source: %Room{}}

  """
  def change_room(%Room{} = room) do
    Room.changeset(room, %{})
  end
end
