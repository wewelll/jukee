defmodule Jukee.Repo.Migrations.CreateTracks do
  use Ecto.Migration

  def change do
    create table(:tracks) do
      add :url, :string, null: false
      add :provider, :string, null: false
      add :external_id, :string, null: false
      add :title, :string, null: false
      add :description, :string
      add :duration, :integer, null: false
      add :channel_title, :string, null: false
      add :channel_id, :string, null: false
      add :default_thumbnail, :string
      add :large_thumbnail, :string

      timestamps()
    end

  end
end
