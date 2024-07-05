import { createStyleSheet } from "react-native-unistyles";

export const ThemeCardHeight = 80;

export const stylesheet = createStyleSheet((theme, runtime) => ({
  themeCard: {
    height: ThemeCardHeight,
  },
  themeCardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
  },
  themeName: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.xxs,
    paddingHorizontal: theme.spacing.xs,
    borderRadius: theme.card.borderRadius,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  themeName_selected: {
    backgroundColor: theme.colors.primary,
  },
}));
