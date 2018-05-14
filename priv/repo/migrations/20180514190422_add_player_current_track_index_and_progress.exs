defmodule Jukee.Repo.Migrations.AddPlayerCurrentTrackIndexAndProgress do
  use Ecto.Migration

  def change do
    alter table(:players) do
      add :current_player_track_id, references(:players_tracks, on_delete: :nilify_all)
      add :track_progress, :integer, default: 0, null: false
    end

    create index(:players, [:current_player_track_id])
  end
end
