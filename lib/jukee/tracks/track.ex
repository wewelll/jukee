defmodule Jukee.Tracks.Track do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tracks" do
    field :channel_id, :string
    field :channel_title, :string
    field :default_thumbnail, :string
    field :description, :string
    field :duration, :integer
    field :external_id, :string
    field :large_thumbnail, :string
    field :provider, :string
    field :title, :string
    field :url, :string

    timestamps()
  end

  @doc false
  def changeset(track, attrs) do
    track
    |> cast(attrs, [:url, :provider, :external_id, :title, :description, :duration, :channel_title, :channel_id, :default_thumbnail, :large_thumbnail])
    |> validate_inclusion(:provider, ["soundcloud", "youtube"])
    |> validate_required([:url, :provider, :external_id, :title, :duration, :channel_title, :channel_id])
  end
end
