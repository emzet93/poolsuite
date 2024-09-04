import TrackPlayerAndroid from "track-player-android";

import { Track } from "@/store/library/types";
import { TrackPlayerService } from "@/store/player/trackPlayer/types";

export const TrackPlayer: TrackPlayerService = {
  play: TrackPlayerAndroid.play,
  pause: TrackPlayerAndroid.pause,
  skipToNext: (track: Track) => TrackPlayerAndroid.skipToNext(),
  skipToPrevious: (track: Track) => TrackPlayerAndroid.skipToPrevious(),
  seekTo: TrackPlayerAndroid.seekTo,
  reset: TrackPlayerAndroid.reset,
  setQueue: async (tracks: Track[]) => {
    await TrackPlayerAndroid.reset();
    await TrackPlayerAndroid.setQueue(
      tracks.map((track) => ({
        id: track.id,
        url: track.url,
        title: track.title,
        artist: track.artist,
        duration: track.durationMs / 1000,
        artwork: require("@/assets/images/icon.png"),
        album: "Poolsuite",
      })),
    );
  },
};
