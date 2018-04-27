# defmodule JukeeWeb.PlayerControllerTest do
#   use JukeeWeb.ConnCase

#   alias Jukee.Players
#   alias Jukee.Players.Player

#   @create_attrs %{muted: true, playing: true, track_start: ~N[2010-04-17 14:00:00.000000], volume: 120.5}
#   @update_attrs %{muted: false, playing: false, track_start: ~N[2011-05-18 15:01:01.000000], volume: 456.7}
#   @invalid_attrs %{muted: nil, playing: nil, track_start: nil, volume: nil}

#   def fixture(:player) do
#     {:ok, player} = Players.create_player(@create_attrs)
#     player
#   end

#   setup %{conn: conn} do
#     {:ok, conn: put_req_header(conn, "accept", "application/json")}
#   end

#   describe "update player" do
#     setup [:create_player]

#     test "renders player when data is valid", %{conn: conn, player: %Player{id: id} = player} do
#       conn = put conn, player_path(conn, :update, player), player: @update_attrs
#       assert %{"id" => ^id} = json_response(conn, 200)["data"]

#       conn = get conn, player_path(conn, :show, id)
#       assert json_response(conn, 200)["data"] == %{
#         "id" => id,
#         "muted" => false,
#         "playing" => false,
#         "track_start" => ~N[2011-05-18 15:01:01.000000],
#         "volume" => 456.7}
#     end

#     test "renders errors when data is invalid", %{conn: conn, player: player} do
#       conn = put conn, player_path(conn, :update, player), player: @invalid_attrs
#       assert json_response(conn, 422)["errors"] != %{}
#     end
#   end

#   defp create_player(_) do
#     player = fixture(:player)
#     {:ok, player: player}
#   end
# end
