# defmodule Jukee.PlayersTest do
#   use Jukee.DataCase

#   alias Jukee.Players

#   describe "players" do
#     alias Jukee.Players.Player

#     @valid_attrs %{muted: true, playing: true, track_start: ~N[2010-04-17 14:00:00.000000], volume: 120.5}
#     @update_attrs %{muted: false, playing: false, track_start: ~N[2011-05-18 15:01:01.000000], volume: 456.7}
#     @invalid_attrs %{muted: nil, playing: nil, track_start: nil, volume: nil}

#     def player_fixture(attrs \\ %{}) do
#       {:ok, player} =
#         attrs
#         |> Enum.into(@valid_attrs)
#         |> Players.create_player()

#       player
#     end

#     test "list_players/0 returns all players" do
#       player = player_fixture()
#       assert Players.list_players() == [player]
#     end

#     test "get_player!/1 returns the player with given id" do
#       player = player_fixture()
#       assert Players.get_player!(player.id) == player
#     end

#     test "create_player/1 with valid data creates a player" do
#       assert {:ok, %Player{} = player} = Players.create_player(@valid_attrs)
#       assert player.muted == true
#       assert player.playing == true
#       assert player.track_start == ~N[2010-04-17 14:00:00.000000]
#       assert player.volume == 120.5
#     end

#     test "create_player/1 with invalid data returns error changeset" do
#       assert {:error, %Ecto.Changeset{}} = Players.create_player(@invalid_attrs)
#     end

#     test "update_player/2 with valid data updates the player" do
#       player = player_fixture()
#       assert {:ok, player} = Players.update_player(player, @update_attrs)
#       assert %Player{} = player
#       assert player.muted == false
#       assert player.playing == false
#       assert player.track_start == ~N[2011-05-18 15:01:01.000000]
#       assert player.volume == 456.7
#     end

#     test "update_player/2 with invalid data returns error changeset" do
#       player = player_fixture()
#       assert {:error, %Ecto.Changeset{}} = Players.update_player(player, @invalid_attrs)
#       assert player == Players.get_player!(player.id)
#     end

#     test "delete_player/1 deletes the player" do
#       player = player_fixture()
#       assert {:ok, %Player{}} = Players.delete_player(player)
#       assert_raise Ecto.NoResultsError, fn -> Players.get_player!(player.id) end
#     end

#     test "change_player/1 returns a player changeset" do
#       player = player_fixture()
#       assert %Ecto.Changeset{} = Players.change_player(player)
#     end
#   end
# 
#   describe "players_tracks" do
#     alias Jukee.Players.PlayerTrack

#     @valid_attrs %{}
#     @update_attrs %{}
#     @invalid_attrs %{}

#     def player_track_fixture(attrs \\ %{}) do
#       {:ok, player_track} =
#         attrs
#         |> Enum.into(@valid_attrs)
#         |> Players.create_player_track()

#       player_track
#     end

#     test "list_players_tracks/0 returns all players_tracks" do
#       player_track = player_track_fixture()
#       assert Players.list_players_tracks() == [player_track]
#     end

#     test "get_player_track!/1 returns the player_track with given id" do
#       player_track = player_track_fixture()
#       assert Players.get_player_track!(player_track.id) == player_track
#     end

#     test "create_player_track/1 with valid data creates a player_track" do
#       assert {:ok, %PlayerTrack{} = player_track} = Players.create_player_track(@valid_attrs)
#     end

#     test "create_player_track/1 with invalid data returns error changeset" do
#       assert {:error, %Ecto.Changeset{}} = Players.create_player_track(@invalid_attrs)
#     end

#     test "update_player_track/2 with valid data updates the player_track" do
#       player_track = player_track_fixture()
#       assert {:ok, player_track} = Players.update_player_track(player_track, @update_attrs)
#       assert %PlayerTrack{} = player_track
#     end

#     test "update_player_track/2 with invalid data returns error changeset" do
#       player_track = player_track_fixture()
#       assert {:error, %Ecto.Changeset{}} = Players.update_player_track(player_track, @invalid_attrs)
#       assert player_track == Players.get_player_track!(player_track.id)
#     end

#     test "delete_player_track/1 deletes the player_track" do
#       player_track = player_track_fixture()
#       assert {:ok, %PlayerTrack{}} = Players.delete_player_track(player_track)
#       assert_raise Ecto.NoResultsError, fn -> Players.get_player_track!(player_track.id) end
#     end

#     test "change_player_track/1 returns a player_track changeset" do
#       player_track = player_track_fixture()
#       assert %Ecto.Changeset{} = Players.change_player_track(player_track)
#     end
#   end
# 
#   describe "players_connections" do
#     alias Jukee.Players.PlayerConnection

#     @valid_attrs %{end_date: ~N[2010-04-17 14:00:00.000000], start_date: ~N[2010-04-17 14:00:00.000000]}
#     @update_attrs %{end_date: ~N[2011-05-18 15:01:01.000000], start_date: ~N[2011-05-18 15:01:01.000000]}
#     @invalid_attrs %{end_date: nil, start_date: nil}

#     def player_connection_fixture(attrs \\ %{}) do
#       {:ok, player_connection} =
#         attrs
#         |> Enum.into(@valid_attrs)
#         |> Players.create_player_connection()

#       player_connection
#     end

#     test "list_players_connections/0 returns all players_connections" do
#       player_connection = player_connection_fixture()
#       assert Players.list_players_connections() == [player_connection]
#     end

#     test "get_player_connection!/1 returns the player_connection with given id" do
#       player_connection = player_connection_fixture()
#       assert Players.get_player_connection!(player_connection.id) == player_connection
#     end

#     test "create_player_connection/1 with valid data creates a player_connection" do
#       assert {:ok, %PlayerConnection{} = player_connection} = Players.create_player_connection(@valid_attrs)
#       assert player_connection.end_date == ~N[2010-04-17 14:00:00.000000]
#       assert player_connection.start_date == ~N[2010-04-17 14:00:00.000000]
#     end

#     test "create_player_connection/1 with invalid data returns error changeset" do
#       assert {:error, %Ecto.Changeset{}} = Players.create_player_connection(@invalid_attrs)
#     end

#     test "update_player_connection/2 with valid data updates the player_connection" do
#       player_connection = player_connection_fixture()
#       assert {:ok, player_connection} = Players.update_player_connection(player_connection, @update_attrs)
#       assert %PlayerConnection{} = player_connection
#       assert player_connection.end_date == ~N[2011-05-18 15:01:01.000000]
#       assert player_connection.start_date == ~N[2011-05-18 15:01:01.000000]
#     end

#     test "update_player_connection/2 with invalid data returns error changeset" do
#       player_connection = player_connection_fixture()
#       assert {:error, %Ecto.Changeset{}} = Players.update_player_connection(player_connection, @invalid_attrs)
#       assert player_connection == Players.get_player_connection!(player_connection.id)
#     end

#     test "delete_player_connection/1 deletes the player_connection" do
#       player_connection = player_connection_fixture()
#       assert {:ok, %PlayerConnection{}} = Players.delete_player_connection(player_connection)
#       assert_raise Ecto.NoResultsError, fn -> Players.get_player_connection!(player_connection.id) end
#     end

#     test "change_player_connection/1 returns a player_connection changeset" do
#       player_connection = player_connection_fixture()
#       assert %Ecto.Changeset{} = Players.change_player_connection(player_connection)
#     end
#   end
# end
