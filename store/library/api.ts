import axios from "axios";

import { Channel } from "@/store/library/types";

export const fetchChannels = async (): Promise<Channel[]> => {
  const { data } = await axios.get(
    "https://api.poolsidefm.workers.dev/v1/get_tracks_by_playlist",
  );

  return data.payload.map((channel: any) => ({
    id: channel.slug,
    url: channel.url,
    name: channel.name.toLowerCase().includes("poolsuite fm")
      ? "Poolsuite FM"
      : channel.name,
    slug: channel.slug,
    order: channel.order,
    totalTracks: channel.total_tracks,
    tracks: channel.tracks_in_order.map((track: any) => ({
      id: track.soundcloud_id,
      url: `https://api.poolsidefm.workers.dev/v2/get_sc_mp3_stream?track_id=${track.soundcloud_id}`,
      title: track.title,
      artist: track.artist,
      durationMs: track.duration_ms,
      dateAdded: track.date_added,
      waveformUrl: track.waveform_url.replace(".png", ".json"),
      soundcloudUrl: track.permalink_url,
    })),
  }));
};
