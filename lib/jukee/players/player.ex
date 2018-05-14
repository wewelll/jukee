defmodule Jukee.Players.Player do
  use Ecto.Schema
  import Ecto.Changeset


  schema "players" do
    field :muted, :boolean, default: false
    field :playing, :boolean, default: false
    field :track_start, :naive_datetime
    field :volume, :float
    belongs_to :room, Jukee.Rooms.Room
    many_to_many :tracks, Jukee.Tracks.Track, join_through: Jukee.Players.PlayerTrack
    has_many :player_tracks, Jukee.Players.PlayerTrack

    timestamps()
  end

  @doc false
  def changeset(player, attrs) do
    player
    |> cast(attrs, [:playing, :track_start, :volume, :muted])
  end
end
