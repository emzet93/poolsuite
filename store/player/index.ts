import TrackPlayer from "react-native-track-player";
import { create } from "zustand";

import { Channel } from "@/store/library/types";

export interface Queue {
  channel: Channel;
  activeTrackId: string;
}

export interface PlayerState {
  queue: Queue | undefined;
  isPlaying: boolean;
  isBuffering: boolean;
}

export const usePlayerStore = create<PlayerState>()(() => ({
  queue: undefined,
  isPlaying: false,
  isBuffering: false,
}));

// selectors
export const selectQueueTracks = (state: PlayerState) =>
  state.queue?.channel.tracks;

export const selectActiveTrackIndex = (state: PlayerState) => {
  if (!state.queue) {
    return -1;
  }

  return state.queue.channel.tracks.findIndex(
    (track) => track.id === state.queue!.activeTrackId,
  );
};

export const selectActiveTrack = (state: PlayerState) => {
  if (!state.queue) {
    return undefined;
  }

  return state.queue.channel.tracks[selectActiveTrackIndex(state)];
};

export const selectNextTrack = (state: PlayerState) => {
  const index = selectActiveTrackIndex(state);
  const tracks = selectQueueTracks(state);

  if (!tracks) {
    return undefined;
  }

  return tracks[index + 1] || tracks[0];
};

export const selectPreviousTrack = (state: PlayerState) => {
  const index = selectActiveTrackIndex(state);
  const tracks = selectQueueTracks(state);

  if (!tracks) {
    return undefined;
  }

  return tracks[index - 1] || tracks[0];
};

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
  await TrackPlayer.setQueue(
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

export const setActiveTrackId = (activeTrackId: string) => {
  usePlayerStore.setState((state) => ({
    queue: state.queue && {
      ...state.queue,
      activeTrackId,
    },
  }));
};

export const playNext = async () => {
  const nextTrack = selectNextTrack(usePlayerStore.getState());

  if (nextTrack) {
    setActiveTrackId(nextTrack.id);
    await TrackPlayer.skipToNext();
  }
};

export const playPrevious = async () => {
  const index = selectActiveTrackIndex(usePlayerStore.getState());
  const progress = await TrackPlayer.getProgress();

  if (index === 0 || progress.position > 3) {
    await TrackPlayer.seekTo(0);
    return;
  }

  const previousTrack = selectPreviousTrack(usePlayerStore.getState());

  if (previousTrack) {
    setActiveTrackId(previousTrack.id);

    await TrackPlayer.skipToPrevious();
  }
};

export const seekTo = (positionInSeconds: number) =>
  TrackPlayer.seekTo(positionInSeconds);
