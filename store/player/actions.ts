import TrackPlayer from "react-native-track-player";

import { Channel } from "@/store/library/types";
import {
  selectActiveTrackIndex,
  selectNextTrack,
  selectPreviousTrack,
  selectProgress,
  usePlayerStore,
} from "@/store/player/index";
import { sleep } from "@/utils/helpers";

export const playChannel = async (channel: Channel, shouldPlay = true) => {
  usePlayerStore.setState({
    queue: {
      channel,
      activeTrackId: channel.tracks[0].id,
    },
    isPlaying: shouldPlay,
    isBuffering: false,
  });

  await TrackPlayer.reset();
  await TrackPlayer.add(
    channel.tracks.map((track) => ({
      id: track.id,
      url: track.url,
      title: track.title,
      artist: track.artist,
      duration: track.durationMs / 1000,
    })),
  );

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
  usePlayerStore.setState({
    isPlaying: true,
  });
  // There is a bug on iOS which happens when calling TrackPlayer.play() right after changing track.
  // After change, it plays half a second of previous song in queue.
  // This await helps with that without affecting user experience.
  await sleep(300);
  return TrackPlayer.play();
};

export const playNext = async () => {
  const nextTrack = selectNextTrack(usePlayerStore.getState());

  if (nextTrack) {
    setActiveTrackId(nextTrack.id);
    await TrackPlayer.skipToNext();
    onTrackChange();
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
    await TrackPlayer.skipToPrevious();
    onTrackChange();
  }
};

export const seekTo = (positionInSeconds: number) =>
  TrackPlayer.seekTo(positionInSeconds);
