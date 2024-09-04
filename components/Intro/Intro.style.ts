import { Platform, StyleSheet } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    bottom: Platform.select({
      ios: 0,
      android: runtime.navigationBar.height,
    }),
    backgroundColor: theme.colors.secondary,
  },
  content: {
    flex: 1,
    padding: theme.spacing.s,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
}));
