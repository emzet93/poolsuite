import { fetchChannels } from "@/store/library/api";
import { useLibraryStore } from "@/store/library/index";
import { Channel } from "@/store/library/types";
import { playChannel, usePlayerStore } from "@/store/player";

export const setChannels = (channels: Channel[]) =>
  useLibraryStore.setState({ channels });

export const initLibrary = async () => {
  try {
    const channels = await fetchChannels();

    setChannels(channels);

    if (!usePlayerStore.getState().queue) {
      await playChannel(channels[0], false);
    }
  } catch (e) {
    console.log("error", e);
  }
};
