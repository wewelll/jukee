defmodule JukeeWeb.PlayerChannel do
  use JukeeWeb, :channel

  def join("player:" <> player_id, payload, socket) do
    if authorized?(player_id, payload) do
      :timer.send_interval(1000, :player_progress)
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_info(:player_progress, socket) do
    broadcast socket, "player_progress", %{}
    {:noreply, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (player:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Everyone can join a player channel
  defp authorized?(_player_id, _payload) do
    true
  end
end
