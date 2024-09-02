import { StyleSheet } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: theme.spacing.xs,
    paddingBottom: runtime.insets.bottom + theme.spacing.xs,
  },
  backdropContainer: {
    ...StyleSheet.absoluteFillObject,
  },
}));
