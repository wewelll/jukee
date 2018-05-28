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
      externalId: track.external_id,
      title: track.title,
      description: track.description,
      duration: track.duration,
      channelTitle: track.channel_title,
      channelId: track.channel_id,
      defaultThumbnail: track.default_thumbnail,
      largeThumbnail: track.large_thumbnail}
  end
end
