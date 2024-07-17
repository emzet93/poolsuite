import { PlayerState } from "./types";

export const selectIsPlaying = (state: PlayerState) => state.isPlaying;

export const selectIsBuffering = (state: PlayerState) => state.isBuffering;

export const selectProgress = (state: PlayerState) => state.progress;

export const selectQueue = (state: PlayerState) => state.queue;

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
