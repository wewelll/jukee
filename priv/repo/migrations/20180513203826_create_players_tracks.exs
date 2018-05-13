defmodule Jukee.Repo.Migrations.CreatePlayersTracks do
  use Ecto.Migration

  def change do
    create table(:players_tracks) do
      add :player_id, references(:players, on_delete: :delete_all)
      add :track_id, references(:tracks, on_delete: :delete_all)

      timestamps()
    end

    create index(:players_tracks, [:player_id])
    create index(:players_tracks, [:track_id])
  end
end
