defmodule Jukee.TrackSearch do
  require Logger
  alias Jukee.TrackSearch
  alias Jukee.Tracks.Track
  
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

  def get_track(%{"provider" => provider, "externalId" => external_id}) do
    case provider do
      "youtube" ->
        get_youtube_track(external_id)
    end
  end

  def get_youtube_track(external_id) do
    case Tubex.Video.detail(external_id, [part: "snippet,contentDetails"]) do
      response ->
        item = List.first(Map.get(response, "items"))
        map_youtube_track(item)
      err -> err
    end
  end

  def map_youtube_track(item) do
    contentDetails = Map.get(item, "contentDetails")
    snippet = Map.get(item, "snippet")
    thumbnails = Map.get(snippet, "thumbnails")
    {:ok, duration} = Timex.Duration.parse(Map.get(contentDetails, "duration"))

    %Track{
      channel_id: Map.get(snippet, "channelId"),
      channel_title: Map.get(snippet, "channelTitle"),
      default_thumbnail: Map.get(Map.get(thumbnails, "default"), "url"),
      description: "description",
      duration: Timex.Duration.to_milliseconds(duration, truncate: true),
      external_id: Map.get(item, "id"),
      large_thumbnail: Map.get(Map.get(thumbnails, "maxres"), "url"),
      provider: "youtube",
      title: Map.get(snippet, "title"),
      url: "https://www.youtube.com/watch?v=" <> Map.get(item, "id")
    }
  end
end
