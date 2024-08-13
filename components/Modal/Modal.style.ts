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
  backdrop: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    opacity: 0.65,
  },
  modal: {},
  content: {},
}));
