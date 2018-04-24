defmodule Jukee.Rooms.Room do
  use Ecto.Schema
  import Ecto.Changeset


  schema "rooms" do
    field :url, :string
    belongs_to :creator, Jukee.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, [:url])
    |> validate_required([:url])
    |> unique_constraint(:url)
  end
end
