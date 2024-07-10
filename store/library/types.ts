export interface Track {
  id: string;
  url: string;
  title: string;
  artist: string;
  durationMs: number;
  dateAdded: string;
  waveformUrl: string;
  soundcloudUrl: string;
}

export interface Channel {
  id: string;
  url: string;
  name: string;
  slug: string;
  totalTracks: number;
  tracks: Track[];
  order: number;
}
