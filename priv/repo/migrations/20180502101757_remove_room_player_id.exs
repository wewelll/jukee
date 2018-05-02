defmodule Jukee.Repo.Migrations.RemoveRoomPlayerId do
  use Ecto.Migration

  def change do
    alter table(:rooms) do
      remove :player_id
    end
  end
end
