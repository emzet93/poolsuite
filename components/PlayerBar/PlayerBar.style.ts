import { createStyleSheet } from "react-native-unistyles";

export const PlayerBarHeight = 50;

export const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.secondary,
    paddingBottom: runtime.insets.bottom,
    borderTopWidth: 1,
    borderColor: theme.colors.primary,
  },
  player: {
    height: PlayerBarHeight,
    padding: theme.spacing.s,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.s,
  },
  trackInfo: {
    flex: 1,
    gap: theme.spacing.xxs,
  },
}));
