defmodule JukeeWeb.TrackSearchView do
  use JukeeWeb, :view
  alias JukeeWeb.TrackSearchView

  def render("index.json", %{track_search_set: track_search_set}) do
    %{
      data: render_many(track_search_set.track_searchs, TrackSearchView, "track_search.json"),
      provider: track_search_set.provider
    }
  end

  def render("show.json", %{track_search: track_search}) do
    %{data: render_one(track_search, TrackSearchView, "track_search.json")}
  end

  def render("track_search.json", %{track_search: track_search}) do
    %{provider: track_search.provider,
      externalId: track_search.external_id,
      title: track_search.title,
      channelTitle: track_search.channel_title,
      thumbnail: track_search.thumbnail
    }
  end
end
