import TrackPlayerIOS from "react-native-track-player";

import { Track } from "@/store/library/types";
import { TrackPlayerService } from "@/store/player/trackPlayer/types";

const setTrack = async (track: Track) => {
  await TrackPlayerIOS.reset();
  await TrackPlayerIOS.add([
    {
      id: track.id,
      url: track.url,
      title: track.title,
      artist: track.artist,
      duration: track.durationMs / 1000,
      artwork: require("@/assets/images/icon.png"),
      album: "Poolsuite",
    },
  ]);
};

export const TrackPlayer: TrackPlayerService = {
  play: TrackPlayerIOS.play,
  pause: TrackPlayerIOS.pause,
  skipToNext: (track: Track) => setTrack(track),
  skipToPrevious: (track: Track) => setTrack(track),
  seekTo: TrackPlayerIOS.seekTo,
  reset: TrackPlayerIOS.reset,
  setQueue: (tracks: Track[]) => setTrack(tracks[0]),
};
