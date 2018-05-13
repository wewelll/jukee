defmodule JukeeWeb.TrackView do
  use JukeeWeb, :view
  alias JukeeWeb.TrackView

  def render("index.json", %{tracks: tracks}) do
    %{data: render_many(tracks, TrackView, "track.json")}
  end

  def render("show.json", %{track: track}) do
    %{data: render_one(track, TrackView, "track.json")}
  end

  def render("track.json", %{track: track}) do
    %{id: track.id,
      url: track.url,
      provider: track.provider,
      external_id: track.external_id,
      title: track.title,
      description: track.description,
      duration: track.duration,
      channel_title: track.channel_title,
      channel_id: track.channel_id,
      default_thumbnail: track.default_thumbnail,
      large_thumbnail: track.large_thumbnail}
  end
end
