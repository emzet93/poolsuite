import { createStyleSheet } from "react-native-unistyles";

export const NavigationBarHeight = 36;
export const ArrowSize = 16;
export const ArrowOffset = ArrowSize * 2;

export const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    paddingTop: runtime.insets.top,
    backgroundColor: theme.colors.secondary,
  },
  navigationBar: {
    backgroundColor: theme.colors.primary,
    height: NavigationBarHeight,
    flexDirection: "row",
    overflow: "hidden",
  },
  navigationArrow: {
    paddingHorizontal: theme.spacing.xs,
    justifyContent: "center",
    alignItems: "center",
  },
  namesContainer: {
    flex: 1,
    alignSelf: "stretch",
  },
  name: {
    height: NavigationBarHeight,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.xxs,
  },
  progressBarWrapper: {
    backgroundColor: theme.colors.primary,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: theme.spacing.xxs / 2,
  },
  progressBar: {
    height: theme.spacing.xxs / 2,
    backgroundColor: theme.colors.secondary,
  },
}));
