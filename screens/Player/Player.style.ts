import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    padding: theme.spacing.xs,
    paddingBottom: runtime.insets.bottom + theme.spacing.xs,
    flex: 1,
    backgroundColor: theme.colors.secondary,
    gap: theme.spacing.l,
  },
  cameraCard: {
    flex: 1,
  },
  playerCard: {
    flex: 1,
  },
  card: {
    flex: 1,
    padding: theme.spacing.xs,
  },
}));
