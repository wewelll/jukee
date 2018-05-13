# defmodule Jukee.TracksTest do
#   use Jukee.DataCase

#   alias Jukee.Tracks

#   describe "tracks" do
#     alias Jukee.Tracks.Track

#     @valid_attrs %{channel_id: "some channel_id", channel_title: "some channel_title", default_thumbnail: "some default_thumbnail", description: "some description", duration: 42, external_id: "some external_id", large_thumbnail: "some large_thumbnail", provider: "some provider", title: "some title", url: "some url"}
#     @update_attrs %{channel_id: "some updated channel_id", channel_title: "some updated channel_title", default_thumbnail: "some updated default_thumbnail", description: "some updated description", duration: 43, external_id: "some updated external_id", large_thumbnail: "some updated large_thumbnail", provider: "some updated provider", title: "some updated title", url: "some updated url"}
#     @invalid_attrs %{channel_id: nil, channel_title: nil, default_thumbnail: nil, description: nil, duration: nil, external_id: nil, large_thumbnail: nil, provider: nil, title: nil, url: nil}

#     def track_fixture(attrs \\ %{}) do
#       {:ok, track} =
#         attrs
#         |> Enum.into(@valid_attrs)
#         |> Tracks.create_track()

#       track
#     end

#     test "list_tracks/0 returns all tracks" do
#       track = track_fixture()
#       assert Tracks.list_tracks() == [track]
#     end

#     test "get_track!/1 returns the track with given id" do
#       track = track_fixture()
#       assert Tracks.get_track!(track.id) == track
#     end

#     test "create_track/1 with valid data creates a track" do
#       assert {:ok, %Track{} = track} = Tracks.create_track(@valid_attrs)
#       assert track.channel_id == "some channel_id"
#       assert track.channel_title == "some channel_title"
#       assert track.default_thumbnail == "some default_thumbnail"
#       assert track.description == "some description"
#       assert track.duration == 42
#       assert track.external_id == "some external_id"
#       assert track.large_thumbnail == "some large_thumbnail"
#       assert track.provider == "some provider"
#       assert track.title == "some title"
#       assert track.url == "some url"
#     end

#     test "create_track/1 with invalid data returns error changeset" do
#       assert {:error, %Ecto.Changeset{}} = Tracks.create_track(@invalid_attrs)
#     end

#     test "update_track/2 with valid data updates the track" do
#       track = track_fixture()
#       assert {:ok, track} = Tracks.update_track(track, @update_attrs)
#       assert %Track{} = track
#       assert track.channel_id == "some updated channel_id"
#       assert track.channel_title == "some updated channel_title"
#       assert track.default_thumbnail == "some updated default_thumbnail"
#       assert track.description == "some updated description"
#       assert track.duration == 43
#       assert track.external_id == "some updated external_id"
#       assert track.large_thumbnail == "some updated large_thumbnail"
#       assert track.provider == "some updated provider"
#       assert track.title == "some updated title"
#       assert track.url == "some updated url"
#     end

#     test "update_track/2 with invalid data returns error changeset" do
#       track = track_fixture()
#       assert {:error, %Ecto.Changeset{}} = Tracks.update_track(track, @invalid_attrs)
#       assert track == Tracks.get_track!(track.id)
#     end

#     test "delete_track/1 deletes the track" do
#       track = track_fixture()
#       assert {:ok, %Track{}} = Tracks.delete_track(track)
#       assert_raise Ecto.NoResultsError, fn -> Tracks.get_track!(track.id) end
#     end

#     test "change_track/1 returns a track changeset" do
#       track = track_fixture()
#       assert %Ecto.Changeset{} = Tracks.change_track(track)
#     end
#   end
# end
