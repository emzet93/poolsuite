import { StyleSheet } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
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
