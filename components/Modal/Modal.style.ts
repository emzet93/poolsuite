import { StyleSheet } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: theme.spacing.xs,
    paddingBottom: Math.max(
      runtime.insets.bottom - runtime.navigationBar.height + theme.spacing.xs,
      theme.spacing.xs,
    ),
  },
  backdropContainer: {
    ...StyleSheet.absoluteFillObject,
  },
}));
