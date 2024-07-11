import { create } from "zustand";

import { LibraryState } from "@/store/library/types";

export const useLibraryStore = create<LibraryState>()(() => ({
  channels: [],
}));

export * from "./actions";
export * from "./selectors";
