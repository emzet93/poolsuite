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

export const playChannel = (channel: Channel, shouldPlay = true) => {
  usePlayerStore.setState({
    queue: {
      channel,
      activeTrackId: channel.tracks[0].id,
    },
    isPlaying: shouldPlay,
  });
};
