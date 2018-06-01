defmodule JukeeWeb.PlayerView do
  use JukeeWeb, :view
  alias JukeeWeb.PlayerView
  alias JukeeWeb.PlayerTrackView
  alias JukeeWeb.TrackView

  def render("index.json", %{players: players}) do
    %{data: render_many(players, PlayerView, "player_list.json")}
  end

  def render("show.json", %{player: player}) do
    %{data: render_one(player, PlayerView, "player.json")}
  end

  def render("player.json", %{player: player}) do
    %{id: player.id,
      playing: player.playing,
      trackStart: player.track_start,
      volume: player.volume,
      muted: player.muted,
      trackProgress: player.track_progress,
      currentTrack: render_one(player.current_player_track, PlayerTrackView, "player_track.json"),
      tracks: render_many(player.player_tracks, PlayerTrackView, "player_track.json"),
      autoplay: player.autoplay,
    }
  end

  def render("player_list.json", %{player: player}) do
    %{id: player.id,
      playing: player.playing,
      track_start: player.track_start,
      volume: player.volume,
      muted: player.muted,
      track_progress: player.track_progress,
    }
  end
end
