import { createStyleSheet } from "react-native-unistyles";

import { normalizeSize } from "@/utils/ui";

export const PlayerBarHeight = normalizeSize(50);
export const PlayIconSize = normalizeSize(8);

export const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.secondary,
    borderTopWidth: 1,
    borderColor: theme.colors.primary,
  },
  player: {
    height: PlayerBarHeight,
    flexDirection: "row",
  },
  trackInfo: {
    justifyContent: "center",
    flex: 1,
    gap: theme.spacing.xxs / 2,
  },
  text: {
    paddingLeft: theme.spacing.xs,
  },
  playButton: {
    height: PlayerBarHeight,
    width: theme.spacing.xxl,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSafeArea: {
    height: runtime.insets.bottom,
  },
}));
