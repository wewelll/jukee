defmodule Jukee.Repo.Migrations.CreateRooms do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :url, :string
      add :creator_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create unique_index(:rooms, [:url])
    create index(:rooms, [:creator_id])
  end
end
