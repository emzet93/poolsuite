import { Channel } from "@/store/library/types";

export interface Queue {
  channel: Channel;
  activeTrackId: string;
}

export interface PlayerState {
  queue: Queue | undefined;
  isPlaying: boolean;
  isBuffering: boolean;
  progress: number;
}
