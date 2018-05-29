defmodule JukeeWeb.TrackSearchController do
  use JukeeWeb, :controller

  alias Jukee.TrackSearch

  action_fallback JukeeWeb.FallbackController

  def youtube(conn, %{"query" => query}) do
    track_search_set = %{track_searchs: TrackSearch.search_youtube_by_query(query), provider: "youtube"}
    render(conn, "index.json", track_search_set: track_search_set)
  end

  def soundcloud(conn, %{"query" => query}) do
    track_search_set = %{track_searchs: TrackSearch.search_soundcloud_by_query(query), provider: "soundcloud"}
    render(conn, "index.json", track_search_set: track_search_set)
  end
end
