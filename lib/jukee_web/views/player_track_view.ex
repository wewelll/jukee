defmodule JukeeWeb.PlayerTrackView do
  use JukeeWeb, :view
  alias JukeeWeb.TrackView
  alias JukeeWeb.PlayerTrackView

  def render("player_track.json", %{player_track: player_track}) do
    Map.merge(
      render_one(player_track.track, TrackView, "track.json"),
      %{
        player_track_index: player_track.index,
      })
  end
end
