defmodule Jukee.TrackSearchMapping do
  alias Jukee.TrackSearch

  def map_youtube_track_search(result) do
    %TrackSearch{
      title: result.title,
      provider: "youtube",
      external_id: result.video_id,
      channel_title: result.channel_title,
      thumbnail: Map.get(Map.get(result.thumbnails, "default"), "url")
    }
  end

  def map_soundcloud_track_search(result) do
    %TrackSearch{
      title: result.title,
      provider: "soundcloud",
      external_id: to_string(result.id),
      channel_title: Map.get(result.user, "username"),
      thumbnail: result.artwork_url,
    }
  end
end
