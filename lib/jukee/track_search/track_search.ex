defmodule Jukee.TrackSearch do
  alias Jukee.TrackSearch
  alias Jukee.TrackMapping
  alias Jukee.TrackSearchMapping
  
  defstruct title: nil, provider: nil, external_id: nil, channel_title: nil, thumbnail: nil
  
  def search_youtube_by_query(query) do
    case Tubex.Video.search_by_query(query) do
      {:ok, results, response} ->
        Enum.map(results, fn result -> TrackSearchMapping.map_youtube_track_search(result) end)
      err -> err
    end
  end

  def search_soundcloud_by_query(query) do
    client_id = Application.fetch_env!(:soundcloud_ex, :client_id)
    client = SoundcloudEx.Client.new(%{ client_id: client_id })
    results = SoundcloudEx.Track.search(%{q: query, limit: 20}, client)
    Enum.map(results, fn result -> TrackSearchMapping.map_soundcloud_track_search(result) end)
  end

  def get_track(provider, external_id) do
    case provider do
      "youtube" ->
        get_youtube_track(external_id)
      "soundcloud" ->
        get_soundcloud_track(external_id)
    end
  end

  def get_youtube_track(external_id) do
    case Tubex.Video.detail(external_id, [part: "snippet,contentDetails"]) do
      response ->
        item = List.first(Map.get(response, "items"))
        TrackMapping.map_youtube_track(item)
      err -> err
    end
  end

  def get_soundcloud_track(external_id) do
    client_id = Application.fetch_env!(:soundcloud_ex, :client_id)
    client = SoundcloudEx.Client.new(%{ client_id: client_id })
    track = SoundcloudEx.Track.get(external_id, client)
    TrackMapping.map_soundcloud_track(track)
  end

  def get_related_tracks(provider, external_id) do
    case provider do
      "youtube" ->
        get_youtube_related_tracks(external_id)
      "soundcloud" ->
        get_soundcloud_related_tracks(external_id)
    end
  end

  def get_youtube_related_tracks(external_id) do
    case Tubex.Video.related_with_video(external_id, [part: "snippet"]) do
      {:ok, results, response} ->
        Enum.map(results, fn result -> TrackMapping.map_youtube_track(result) end)
      err -> err
    end
  end

  def get_soundcloud_related_tracks(external_id) do
    client_id = Application.fetch_env!(:soundcloud_ex, :client_id)
    client = SoundcloudEx.Client.new(%{ client_id: client_id })
    tracks = SoundcloudEx.Track.related(external_id, client)
    Enum.map(tracks, fn track -> TrackMapping.map_soundcloud_track(track) end)
  end
end
