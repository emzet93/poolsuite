import TrackPlayerIOS from "track-player-ios";

import { Track } from "@/store/library/types";
import { TrackPlayerService } from "@/store/player/trackPlayer/types";

export const TrackPlayer: TrackPlayerService = {
  play: TrackPlayerIOS.play,
  pause: TrackPlayerIOS.pause,
  skipToNext: TrackPlayerIOS.skipToNext,
  skipToPrevious: TrackPlayerIOS.skipToPrevious,
  seekTo: TrackPlayerIOS.seekTo,
  reset: TrackPlayerIOS.reset,
  setQueue: async (tracks: Track[]) => {
    await TrackPlayerIOS.reset();
    await TrackPlayerIOS.add(
      tracks.map((track) => ({
        id: track.id,
        url: track.url,
        title: track.title,
        artist: track.artist,
        duration: track.durationMs / 1000,
      })),
    );
  },
};
