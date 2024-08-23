import { StyleSheet } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: theme.spacing.xs,
    paddingBottom: theme.spacing.xs + runtime.insets.bottom,
  },
  backdropContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {},
  content: {},
}));
