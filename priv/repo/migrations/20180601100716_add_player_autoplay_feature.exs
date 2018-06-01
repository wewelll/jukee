defmodule Jukee.Repo.Migrations.AddPlayerAutoplayFeature do
  use Ecto.Migration

  def change do
    alter table(:players) do
      add :autoplay, :boolean, default: false, null: false
    end
  end
end
