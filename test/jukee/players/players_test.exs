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
# end
