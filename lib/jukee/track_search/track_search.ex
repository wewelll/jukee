defmodule Jukee.TrackSearch do
  require Logger
  alias Jukee.TrackSearch
  
  defstruct title: nil, provider: nil, external_id: nil, channel_title: nil, thumbnail: nil
  
  def search_youtube_by_query(query) do
    case Tubex.Video.search_by_query(query) do
      {:ok, results, response} ->
        Enum.map(results, fn result -> %Jukee.TrackSearch{
          title: result.title,
          provider: "youtube",
          external_id: result.video_id,
          channel_title: result.channel_title,
          thumbnail: Map.get(Map.get(result.thumbnails, "default"), "url")
        } end)
      err -> err
    end
  end
end
