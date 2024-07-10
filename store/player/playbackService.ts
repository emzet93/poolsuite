import debounce from "lodash.debounce";
import { Platform } from "react-native";
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
} from "@/store/player";

const syncActiveTrackId = debounce(setActiveTrackId, 1000, {
  leading: true,
  trailing: true,
});

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
  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, (event) => {
    const trackId: string | undefined = event.track?.id;

    if (trackId) {
      syncActiveTrackId(trackId);
    }
  });
  TrackPlayer.addEventListener(Event.PlaybackError, (event) => {
    console.log("Playback error", event);
    playNext();
  });
  TrackPlayer.addEventListener(Event.PlaybackState, (event) => {
    setIsBuffering([State.Buffering, State.Loading].includes(event.state));
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
    progressUpdateEventInterval: Platform.OS === "android" ? 1 : undefined,
    android: {
      alwaysPauseOnInterruption: true,
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
