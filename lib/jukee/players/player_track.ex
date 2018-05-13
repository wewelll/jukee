defmodule Jukee.Players.PlayerTrack do
  use Ecto.Schema
  import Ecto.Changeset


  schema "players_tracks" do
    belongs_to :player, Jukee.Players.Player
    belongs_to :track, Jukee.Tracks.Track

    timestamps()
  end

  @doc false
  def changeset(player_track, attrs) do
    player_track
    |> cast(attrs, [:player_id, :track_id])
    |> validate_required([:player_id, :track_id])
  end
end
