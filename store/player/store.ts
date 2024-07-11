import { create } from "zustand";

import { PlayerState } from "@/store/player/types";

export const usePlayerStore = create<PlayerState>()(() => ({
  queue: undefined,
  isPlaying: false,
  isBuffering: false,
  progress: 0,
}));
