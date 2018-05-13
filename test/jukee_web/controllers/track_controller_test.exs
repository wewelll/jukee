# defmodule JukeeWeb.TrackControllerTest do
#   use JukeeWeb.ConnCase

#   alias Jukee.Tracks
#   alias Jukee.Tracks.Track

#   @create_attrs %{channel_id: "some channel_id", channel_title: "some channel_title", default_thumbnail: "some default_thumbnail", description: "some description", duration: 42, external_id: "some external_id", large_thumbnail: "some large_thumbnail", provider: "some provider", title: "some title", url: "some url"}
#   @update_attrs %{channel_id: "some updated channel_id", channel_title: "some updated channel_title", default_thumbnail: "some updated default_thumbnail", description: "some updated description", duration: 43, external_id: "some updated external_id", large_thumbnail: "some updated large_thumbnail", provider: "some updated provider", title: "some updated title", url: "some updated url"}
#   @invalid_attrs %{channel_id: nil, channel_title: nil, default_thumbnail: nil, description: nil, duration: nil, external_id: nil, large_thumbnail: nil, provider: nil, title: nil, url: nil}

#   def fixture(:track) do
#     {:ok, track} = Tracks.create_track(@create_attrs)
#     track
#   end

#   setup %{conn: conn} do
#     {:ok, conn: put_req_header(conn, "accept", "application/json")}
#   end

#   describe "index" do
#     test "lists all tracks", %{conn: conn} do
#       conn = get conn, track_path(conn, :index)
#       assert json_response(conn, 200)["data"] == []
#     end
#   end

#   describe "create track" do
#     test "renders track when data is valid", %{conn: conn} do
#       conn = post conn, track_path(conn, :create), track: @create_attrs
#       assert %{"id" => id} = json_response(conn, 201)["data"]

#       conn = get conn, track_path(conn, :show, id)
#       assert json_response(conn, 200)["data"] == %{
#         "id" => id,
#         "channel_id" => "some channel_id",
#         "channel_title" => "some channel_title",
#         "default_thumbnail" => "some default_thumbnail",
#         "description" => "some description",
#         "duration" => 42,
#         "external_id" => "some external_id",
#         "large_thumbnail" => "some large_thumbnail",
#         "provider" => "some provider",
#         "title" => "some title",
#         "url" => "some url"}
#     end

#     test "renders errors when data is invalid", %{conn: conn} do
#       conn = post conn, track_path(conn, :create), track: @invalid_attrs
#       assert json_response(conn, 422)["errors"] != %{}
#     end
#   end

#   describe "update track" do
#     setup [:create_track]

#     test "renders track when data is valid", %{conn: conn, track: %Track{id: id} = track} do
#       conn = put conn, track_path(conn, :update, track), track: @update_attrs
#       assert %{"id" => ^id} = json_response(conn, 200)["data"]

#       conn = get conn, track_path(conn, :show, id)
#       assert json_response(conn, 200)["data"] == %{
#         "id" => id,
#         "channel_id" => "some updated channel_id",
#         "channel_title" => "some updated channel_title",
#         "default_thumbnail" => "some updated default_thumbnail",
#         "description" => "some updated description",
#         "duration" => 43,
#         "external_id" => "some updated external_id",
#         "large_thumbnail" => "some updated large_thumbnail",
#         "provider" => "some updated provider",
#         "title" => "some updated title",
#         "url" => "some updated url"}
#     end

#     test "renders errors when data is invalid", %{conn: conn, track: track} do
#       conn = put conn, track_path(conn, :update, track), track: @invalid_attrs
#       assert json_response(conn, 422)["errors"] != %{}
#     end
#   end

#   describe "delete track" do
#     setup [:create_track]

#     test "deletes chosen track", %{conn: conn, track: track} do
#       conn = delete conn, track_path(conn, :delete, track)
#       assert response(conn, 204)
#       assert_error_sent 404, fn ->
#         get conn, track_path(conn, :show, track)
#       end
#     end
#   end

#   defp create_track(_) do
#     track = fixture(:track)
#     {:ok, track: track}
#   end
# end
