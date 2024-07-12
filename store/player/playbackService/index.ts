import TrackPlayerIOS, { Capability, Event, State } from "track-player-ios";

import {
  pause,
  play,
  playNext,
  playPrevious,
  seekTo,
  setIsBuffering,
  setProgress,
} from "../actions";

const remotePlayerService = () => async () => {
  // Remote controls events
  TrackPlayerIOS.addEventListener(Event.RemotePlay, () => {
    play();
  });
  TrackPlayerIOS.addEventListener(Event.RemotePause, () => {
    pause();
  });
  TrackPlayerIOS.addEventListener(Event.RemoteNext, () => {
    playNext();
  });
  TrackPlayerIOS.addEventListener(Event.RemotePrevious, () => {
    playPrevious();
  });
  TrackPlayerIOS.addEventListener(Event.RemoteSeek, (event) => {
    seekTo(event.position);
  });
  TrackPlayerIOS.addEventListener(Event.RemoteDuck, ({ paused }) => {
    if (paused) {
      pause();
    }
  });

  // Playback events
  TrackPlayerIOS.addEventListener(Event.PlaybackQueueEnded, (event) => {
    if (event.position > 0) {
      playNext();
    }
  });
  TrackPlayerIOS.addEventListener(Event.PlaybackError, (event) => {
    console.log("Playback error", event);
    // TODO: check online status
    playNext();
  });
  TrackPlayerIOS.addEventListener(Event.PlaybackState, (event) => {
    setIsBuffering([State.Buffering, State.Connecting].includes(event.state));
  });
  TrackPlayerIOS.addEventListener(Event.PlaybackProgressUpdated, (event) => {
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

  await TrackPlayerIOS.setupPlayer();
  await TrackPlayerIOS.updateOptions({
    capabilities: REMOTE_CAPABILITIES,
    notificationCapabilities: REMOTE_CAPABILITIES,
    compactCapabilities: REMOTE_CAPABILITIES,
    progressUpdateEventInterval: 1,
    alwaysPauseOnInterruption: true,
  });
};

export const initializePlayer = () => {
  TrackPlayerIOS.registerPlaybackService(remotePlayerService);
  return setupPlayer();
};
