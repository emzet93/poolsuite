import { Track } from "@/store/library/types";

export interface TrackPlayerService {
  play: () => Promise<void>;
  pause: () => Promise<void>;
  skipToNext: () => Promise<void>;
  skipToPrevious: () => Promise<void>;
  seekTo: (positionInSeconds: number) => Promise<void>;
  reset: () => Promise<void>;
  setQueue: (tracks: Track[]) => Promise<void>;
}
