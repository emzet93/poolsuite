import debounce from "lodash.debounce";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  RepeatMode,
  State,
} from "react-native-track-player";

import {
  pause,
  play,
  playNext,
  playPrevious,
  seekTo,
  setIsBuffering,
  setActiveTrackId,
  setProgress,
} from "@/store/player";

const syncActiveTrack = debounce(
  async (index: number) => {
    const queue = await TrackPlayer.getQueue();
    const track = queue[index];

    if (track) {
      setActiveTrackId(track.id);
    }
  },
  500,
  { trailing: true, leading: true },
);

const remotePlayerService = () => async () => {
  // Remote controls events
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    play();
  });
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    pause();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    playNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    playPrevious();
  });
  TrackPlayer.addEventListener(Event.RemoteSeek, (event) => {
    seekTo(event.position);
  });
  TrackPlayer.addEventListener(Event.RemoteDuck, ({ paused }) => {
    if (paused) {
      pause();
    }
  });

  // Playback events
  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, (event) => {
    syncActiveTrack(event.nextTrack);
  });
  TrackPlayer.addEventListener(Event.PlaybackError, (event) => {
    console.log("Playback error", event);
    // TODO: check online status
    playNext();
  });
  TrackPlayer.addEventListener(Event.PlaybackState, (event) => {
    setIsBuffering([State.Buffering, State.Connecting].includes(event.state));
  });
  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, (event) => {
    setProgress(event.position);
  });
};

const setupPlayer = async () => {
  const REMOTE_CAPABILITIES = [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.SeekTo,
  ];

  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    capabilities: REMOTE_CAPABILITIES,
    notificationCapabilities: REMOTE_CAPABILITIES,
    compactCapabilities: REMOTE_CAPABILITIES,
    progressUpdateEventInterval: 1,
    alwaysPauseOnInterruption: true,
    android: {
      appKilledPlaybackBehavior:
        AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    },
  });
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

export const initializePlayer = () => {
  TrackPlayer.registerPlaybackService(remotePlayerService);
  return setupPlayer();
};
