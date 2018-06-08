defmodule Jukee.Repo.Migrations.CreatePlayersConnections do
  use Ecto.Migration

  def change do
    create table(:players_connections) do
      add :start_date, :naive_datetime, null: false, default: fragment("now()")
      add :end_date, :naive_datetime
      add :player_id, references(:players, on_delete: :nilify_all)
      add :user_id, references(:users, on_delete: :nilify_all)

      timestamps()
    end

    create index(:players_connections, [:player_id])
    create index(:players_connections, [:user_id])
  end
end
