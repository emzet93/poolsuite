import { StyleSheet } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    padding: theme.spacing.xs,
    paddingBottom: runtime.insets.bottom + theme.spacing.xs,
    flexGrow: 1,
    backgroundColor: theme.colors.secondary,
    gap: theme.spacing.xs,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  cameraCard: {
    flexGrow: 1,
  },
  cameraCardContent: {
    flex: 1,
  },
  cardLines: {
    marginVertical: theme.spacing.xxs,
  },
}));
