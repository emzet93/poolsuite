import { createStyleSheet } from "react-native-unistyles";

export const NavigationBarHeight = 36;

export const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    paddingTop: runtime.insets.top,
    backgroundColor: theme.colors.secondary,
  },
  navigationBar: {
    backgroundColor: theme.colors.primary,
    height: NavigationBarHeight,
    alignItems: "center",
    overflow: "hidden",
  },
  name: {
    height: NavigationBarHeight,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.xxs,
  },
  progressBarContainer: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.xxs / 2,
  },
  progressBar: {
    height: 2,
    backgroundColor: theme.colors.secondary,
  },
}));
