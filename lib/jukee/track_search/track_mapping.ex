defmodule Jukee.TrackMapping do
  alias Jukee.Tracks.Track

  def map_youtube_track(item) do
    contentDetails = Map.get(item, "contentDetails")
    snippet = Map.get(item, "snippet")
    thumbnails = Map.get(snippet, "thumbnails")
    {:ok, duration} = Timex.Duration.parse(Map.get(contentDetails, "duration"))

    %Track{
      channel_id: Map.get(snippet, "channelId"),
      channel_title: Map.get(snippet, "channelTitle"),
      default_thumbnail: Map.get(Map.get(thumbnails, "default"), "url"),
      description: Map.get(snippet, "description"),
      duration: Timex.Duration.to_milliseconds(duration, truncate: true),
      external_id: Map.get(item, "id"),
      large_thumbnail: Map.get(get_youtube_largest_thumbnail(thumbnails), "url"),
      provider: "youtube",
      title: Map.get(snippet, "title"),
      url: "https://www.youtube.com/watch?v=" <> Map.get(item, "id")
    }
  end

  defp get_youtube_largest_thumbnail(thumbnails) do
    Map.get(thumbnails, "maxres",
      Map.get(thumbnails, "standard", Map.get(thumbnails, "high"))
    )
  end

  def map_soundcloud_track(track) do
    %Track{
      channel_id: to_string(track.user_id),
      channel_title: Map.get(track.user, "username"),
      default_thumbnail: track.artwork_url,
      description: track.description,
      duration: track.duration,
      external_id: to_string(track.id),
      large_thumbnail: (if track.artwork_url != nil, do: Regex.replace(~r/large/, track.artwork_url, "t500x500"), else: nil),
      provider: "soundcloud",
      title: track.title,
      url: track.permalink_url
    }
  end
end
