defmodule JukeeWeb.RoomController do
  use JukeeWeb, :controller

  alias Jukee.Rooms
  alias Jukee.Rooms.Room

  action_fallback JukeeWeb.FallbackController

  def index(conn, _params) do
    rooms = Rooms.list_rooms()
    render(conn, "index.json", rooms: rooms)
  end

  def list_created_by_user(conn, _params) do
    current_user = Jukee.Accounts.get_current_user(conn)
    rooms = Rooms.list_rooms_created_by(current_user)
    render(conn, "index.json", rooms: rooms)
  end

  def create(conn, %{"room" => room_params}) do
    current_user = Jukee.Accounts.get_current_user(conn)
    with {:ok, %Room{} = room} <- Rooms.create_room(room_params, current_user) do
      conn
      |> put_status(:created)
      |> render("show.json", room: room)
    end
  end

  def show(conn, %{"id" => id}) do
    room = Rooms.get_room!(id)
    render(conn, "show.json", room: room)
  end

  def show_by_url(conn, %{"url" => url}) do
    room = Rooms.get_room_by_url!(url)
    render(conn, "show.json", room: room)
  end

  def update(conn, %{"id" => id, "room" => room_params}) do
    room = Rooms.get_room!(id)

    with {:ok, %Room{} = room} <- Rooms.update_room(room, room_params) do
      render(conn, "show.json", room: room)
    end
  end

  def delete(conn, %{"id" => id}) do
    room = Rooms.get_room!(id)
    with {:ok, %Room{}} <- Rooms.delete_room(room) do
      send_resp(conn, :no_content, "")
    end
  end
end
