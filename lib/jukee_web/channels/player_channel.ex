defmodule JukeeWeb.PlayerChannel do
  use JukeeWeb, :channel
  alias Jukee.Players
  alias JukeeWeb.PlayerView
  alias Jukee.TrackSearch
  alias Jukee.Tracks
  alias JukeeWeb.PlayerPresence
  require Logger

  def join("player:" <> player_id, payload, socket) do
    if authorized?(player_id, payload) do
      send(self(), :after_join)
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def terminate(_reason, socket) do
    Logger.info "user left the room"
  end

  def handle_info(:after_join, socket) do
    Logger.info "user joined the room"
    push socket, "presence_state", PlayerPresence.list(socket)
    {:ok, _} = PlayerPresence.track(socket, socket.assigns.user.id, %{
      username: socket.assigns.user.username,
      online_at: inspect(System.system_time(:seconds))
    })
    {:noreply, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("play_track", %{"playerTrackIndex" => player_track_index}, socket) do
    player_id = get_player_id(socket)
    Players.play_track_on_player(player_id, player_track_index)
    {:reply, {:ok, %{ message: "new track playing" }}, socket}
  end

  def handle_in("play", _payload, socket) do
    player_id = get_player_id(socket)
    Players.play(player_id)
    {:reply, {:ok, %{ message: "playing" }}, socket}
  end

  def handle_in("pause", _payload, socket) do
    player_id = get_player_id(socket)
    Players.pause(player_id)
    {:reply, {:ok, %{ message: "paused" }}, socket}
  end

  def handle_in("toggle_pause", _payload, socket) do
    player_id = get_player_id(socket)
    Players.toggle_pause(player_id)
    {:reply, {:ok, %{ message: "toggled" }}, socket}
  end

  def handle_in("seek", %{"to" => to}, socket) do
    player_id = get_player_id(socket)
    Players.seek(player_id, to)
    {:reply, {:ok, %{ message: "seek success" }}, socket}
  end

  def handle_in("next", _payload, socket) do
    player_id = get_player_id(socket)
    Players.next(player_id)
    {:reply, {:ok, %{ message: "next success" }}, socket}
  end

  def handle_in("previous", _payload, socket) do
    player_id = get_player_id(socket)
    Players.previous(player_id)
    {:reply, {:ok, %{ message: "previous success" }}, socket}
  end

  def handle_in("add_track", %{"provider" => provider, "externalId" => external_id}, socket) do
    player_id = get_player_id(socket)
    track = TrackSearch.get_track(provider, external_id)
    Players.add_track(player_id, track)
    {:reply, {:ok, %{ message: "track added" }}, socket}
  end

  def handle_in("delete_track", %{"playerTrackIndex" => player_track_index}, socket) do
    player_id = get_player_id(socket)
    Players.delete_track_on_player(player_id, player_track_index)
    {:reply, {:ok, %{ message: "track deleted" }}, socket}
  end

  def handle_in("autoplay", %{"autoplay" => autoplay}, socket) do
    player_id = get_player_id(socket)
    Players.set_autoplay(player_id, autoplay)
    {:reply, {:ok, %{ message: "ok" }}, socket}
  end

  defp get_player_id(socket) do
    "player:" <> player_id = socket.topic
    player_id
  end

  # Everyone can join a player channel
  defp authorized?(_player_id, _payload) do
    true
  end
end
