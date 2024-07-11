import { LibraryState } from "@/store/library/types";

export const selectChannels = (state: LibraryState) => state.channels;
