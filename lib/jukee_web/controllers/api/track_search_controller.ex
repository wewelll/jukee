defmodule JukeeWeb.TrackSearchController do
  use JukeeWeb, :controller

  alias Jukee.TrackSearch

  action_fallback JukeeWeb.FallbackController

  def youtube(conn, %{"query" => query}) do
    results = TrackSearch.search_youtube_by_query(query)
    render(conn, "index.json", track_searchs: results)
  end

  def soundcloud(conn, %{"query" => query}) do
    results = TrackSearch.search_soundcloud_by_query(query)
    render(conn, "index.json", track_searchs: results)
  end
end
