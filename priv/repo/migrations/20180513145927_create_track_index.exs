defmodule Jukee.Repo.Migrations.CreateTrackIndex do
  use Ecto.Migration

  def change do
    create unique_index(:tracks, [:provider, :external_id])
  end
end
