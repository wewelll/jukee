defmodule Jukee.Repo.Migrations.CreatePlayers do
  use Ecto.Migration

  def change do
    create table(:players) do
      add :playing, :boolean, default: false, null: false
      add :track_start, :naive_datetime
      add :volume, :float
      add :muted, :boolean, default: false, null: false
      add :room_id, references(:rooms, on_delete: :delete_all)

      timestamps()
    end

    alter table(:rooms) do
      add :player_id, references(:players, on_delete: :nothing)
    end

    create index(:players, [:room_id])
  end
end
