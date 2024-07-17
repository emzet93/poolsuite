import debounce from "lodash.debounce";
import TrackPlayerAndroid, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  RepeatMode,
  State,
} from "track-player-android";

import {
  pause,
  play,
  playNext,
  playPrevious,
  seekTo,
  setActiveTrackId,
  setIsBuffering,
  setProgress,
} from "../actions";

const syncActiveTrack = debounce(
  (trackId: string) => {
    setActiveTrackId(trackId);
  },
  500,
  { trailing: true, leading: true },
);

const remotePlayerService = () => async () => {
  // Remote controls events
  TrackPlayerAndroid.addEventListener(Event.RemotePlay, () => {
    play();
  });
  TrackPlayerAndroid.addEventListener(Event.RemotePause, () => {
    pause();
  });
  TrackPlayerAndroid.addEventListener(Event.RemoteNext, () => {
    playNext();
  });
  TrackPlayerAndroid.addEventListener(Event.RemotePrevious, () => {
    playPrevious();
  });
  TrackPlayerAndroid.addEventListener(Event.RemoteSeek, (event) => {
    seekTo(event.position);
  });
  TrackPlayerAndroid.addEventListener(Event.RemoteDuck, ({ paused }) => {
    if (paused) {
      pause();
    }
  });

  // Playback events
  TrackPlayerAndroid.addEventListener(
    Event.PlaybackActiveTrackChanged,
    (event) => {
      if (event.track) {
        syncActiveTrack(event.track.id);
      }
    },
  );
  TrackPlayerAndroid.addEventListener(Event.PlaybackError, (event) => {
    console.log("Playback error", event);
    // TODO: check online status
    playNext();
  });
  TrackPlayerAndroid.addEventListener(Event.PlaybackState, async (event) => {
    setIsBuffering([State.Buffering, State.Loading].includes(event.state));
  });
  TrackPlayerAndroid.addEventListener(
    Event.PlaybackProgressUpdated,
    (event) => {
      setProgress(event.position);
    },
  );
};

const setupPlayer = async () => {
  const REMOTE_CAPABILITIES = [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.SeekTo,
  ];

  await TrackPlayerAndroid.setupPlayer();
  await TrackPlayerAndroid.updateOptions({
    capabilities: REMOTE_CAPABILITIES,
    notificationCapabilities: REMOTE_CAPABILITIES,
    compactCapabilities: REMOTE_CAPABILITIES,
    progressUpdateEventInterval: 1,
    android: {
      alwaysPauseOnInterruption: true,
      appKilledPlaybackBehavior:
        AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    },
  });
  await TrackPlayerAndroid.setRepeatMode(RepeatMode.Queue);
};

export const initializePlayer = () => {
  TrackPlayerAndroid.registerPlaybackService(remotePlayerService);
  return setupPlayer();
};
