import { fetchChannels } from "./api";
import { useLibraryStore } from "./store";
import { Channel } from "./types";

export const setChannels = (channels: Channel[]) =>
  useLibraryStore.setState({ channels });

export const initLibrary = async () => {
  const channels = await fetchChannels();

  setChannels(channels);

  return channels;
};
