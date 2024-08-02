import { Channel } from "@/store/library/types";

import {
  selectActiveTrackIndex,
  selectIsPlaying,
  selectNextTrack,
  selectPreviousTrack,
  selectProgress,
} from "./selectors";
import { usePlayerStore } from "./store";
import { TrackPlayer } from "./trackPlayer";

export const playChannel = async (channel: Channel, autoPlay = true) => {
  const isPlaying = selectIsPlaying(usePlayerStore.getState());
  const shouldPlay = autoPlay || isPlaying;

  usePlayerStore.setState({
    queue: {
      channel,
      activeTrackId: channel.tracks[0].id,
    },
    isPlaying: shouldPlay,
    isBuffering: false,
  });

  await TrackPlayer.setQueue(channel.tracks);

  if (shouldPlay) {
    await TrackPlayer.play();
  }
};

export const play = () => {
  usePlayerStore.setState({
    isPlaying: true,
  });
  return TrackPlayer.play();
};

export const pause = () => {
  usePlayerStore.setState({
    isPlaying: false,
  });
  return TrackPlayer.pause();
};

export const togglePlay = async () => {
  if (usePlayerStore.getState().isPlaying) {
    return pause();
  } else {
    return play();
  }
};

export const setIsBuffering = async (isBuffering: boolean) => {
  usePlayerStore.setState({ isBuffering });
};

export const setProgress = async (progress: number) => {
  usePlayerStore.setState({ progress });
};

export const setActiveTrackId = (activeTrackId: string) => {
  usePlayerStore.setState((state) => ({
    progress: 0,
    queue: state.queue && {
      ...state.queue,
      activeTrackId,
    },
  }));
};

const onTrackChange = async () => {
  play();
};

export const playNext = async (autoPlay = true) => {
  const isPlaying = selectIsPlaying(usePlayerStore.getState());
  const nextTrack = selectNextTrack(usePlayerStore.getState());

  if (nextTrack) {
    setActiveTrackId(nextTrack.id);
    await TrackPlayer.skipToNext(nextTrack);

    if (isPlaying || autoPlay) {
      onTrackChange();
    }
  }
};

export const playPrevious = async () => {
  const index = selectActiveTrackIndex(usePlayerStore.getState());
  const progress = selectProgress(usePlayerStore.getState());

  if (index === 0 || progress > 3) {
    await TrackPlayer.seekTo(0);
    onTrackChange();
    return;
  }

  const previousTrack = selectPreviousTrack(usePlayerStore.getState());

  if (previousTrack) {
    setActiveTrackId(previousTrack.id);
    await TrackPlayer.skipToPrevious(previousTrack);
    onTrackChange();
  }
};

export const seekTo = (positionInSeconds: number) =>
  TrackPlayer.seekTo(positionInSeconds);
