defmodule Jukee.Players.PlayerWorker do
  use GenServer

  def start_link do
    GenServer.start_link(__MODULE__, %{})
  end

  def init(state) do
    schedule_work() # Schedule work to be performed at some point
    {:ok, state}
  end

  def handle_info(:player_progress_update, state) do
    schedule_work()
    players_progress_update()
    {:noreply, state}
  end

  defp players_progress_update() do
    Jukee.Players.players_progress_update(1000)
  end

  defp schedule_work() do
    Process.send_after(self(), :player_progress_update, 1000) # every second
  end
end
