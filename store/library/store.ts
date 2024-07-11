import { create } from "zustand";

import { LibraryState } from "./types";

export const useLibraryStore = create<LibraryState>()(() => ({
  channels: [],
}));
