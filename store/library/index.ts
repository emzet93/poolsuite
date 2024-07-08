import { create } from "zustand";

import { fetchChannels } from "@/store/library/api";
import { Channel } from "@/store/library/types";
import { playChannel, usePlayerStore } from "@/store/player";

interface LibraryState {
  channels: Channel[];
}

export const useLibraryStore = create<LibraryState>()(() => ({
  channels: [],
}));

export const setChannels = (channels: Channel[]) =>
  useLibraryStore.setState({ channels });

export const initLibrary = async () => {
  const channels = await fetchChannels();

  setChannels(channels);

  if (!usePlayerStore.getState().queue) {
    playChannel(channels[0]);
  }
};
