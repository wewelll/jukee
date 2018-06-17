defmodule Mix.Tasks.Deploy do
  use Mix.Task

  @shortdoc "Deploys Jukee to the production server"
  def run(_) do
    Mix.Tasks.Edeliver.run(~w|upgrade production|)
    Mix.Tasks.Edeliver.run(~w|restart production|)
  end
end
