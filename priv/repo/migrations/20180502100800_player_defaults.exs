defmodule Jukee.Repo.Migrations.PlayerDefaults do
  use Ecto.Migration

  def change do
    alter table(:players) do
      modify :track_start, :naive_datetime, default: fragment("now()")
      modify :volume, :float, default: 1
    end
  end
end
