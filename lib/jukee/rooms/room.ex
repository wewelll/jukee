defmodule Jukee.Rooms.Room do
  use Ecto.Schema
  import Ecto.Changeset


  schema "rooms" do
    field :url, :string
    belongs_to :creator, Jukee.Accounts.User
    has_one :player, Jukee.Players.Player

    timestamps()
  end

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, [:url])
    |> validate_required([:url])
    |> validate_format(:url, ~r/^[a-zA-Z0-9_-]*$/)
    |> unique_constraint(:url)
  end
end
