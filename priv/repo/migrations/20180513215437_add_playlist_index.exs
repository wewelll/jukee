defmodule Jukee.Repo.Migrations.AddPlaylistIndex do
  use Ecto.Migration

  def change do
    alter table(:players_tracks) do
      add :index, :integer, null: false
    end

    create unique_index(:players_tracks, [:player_id, :index])
  end
end
