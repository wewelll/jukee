defmodule Jukee.Application do
  use Application

  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      # Start the Ecto repository
      supervisor(Jukee.Repo, []),
      # Start the endpoint when the application starts
      supervisor(JukeeWeb.Endpoint, []),
      # Start your own worker by calling: Jukee.Worker.start_link(arg1, arg2, arg3)
      # worker(Jukee.Worker, [arg1, arg2, arg3]),
      worker(Task, [&Jukee.Players.set_open_player_connections_as_closed/0], restart: :temporary),
      worker(Jukee.Players.PlayerWorker, []),
      supervisor(JukeeWeb.PlayerPresence, []),
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Jukee.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    JukeeWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
