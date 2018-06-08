defmodule Jukee.Players.PlayerConnection do
  use Ecto.Schema
  import Ecto.Changeset


  schema "players_connections" do
    field :end_date, :naive_datetime
    field :start_date, :naive_datetime
    belongs_to :player, Jukee.Players.Player
    belongs_to :user, Jukee.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(player_connection, attrs) do
    player_connection
    |> cast(attrs, [:player_id, :user_id, :start_date, :end_date])
    |> validate_required([:player_id, :user_id])
  end
end
