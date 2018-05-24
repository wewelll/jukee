defmodule Jukee.Repo.Migrations.ExtendTrackDescriptionLength do
  use Ecto.Migration

  def change do    
    alter table(:tracks) do
      modify :description, :text
    end
  end
end
