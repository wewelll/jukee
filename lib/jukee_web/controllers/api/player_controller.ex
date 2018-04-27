defmodule JukeeWeb.PlayerController do
  use JukeeWeb, :controller

  alias Jukee.Players
  alias Jukee.Players.Player

  action_fallback JukeeWeb.FallbackController

  def show(conn, %{"id" => id}) do
    player = Players.get_player!(id)
    render(conn, "show.json", player: player)
  end

  def update(conn, %{"id" => id, "player" => player_params}) do
    player = Players.get_player!(id)

    with {:ok, %Player{} = player} <- Players.update_player(player, player_params) do
      render(conn, "show.json", player: player)
    end
  end
end
