import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    padding: theme.spacing.xs,
    paddingBottom: runtime.insets.bottom + theme.spacing.xs,
    flex: 1,
    backgroundColor: theme.colors.secondary,
    gap: theme.spacing.l,
  },
}));
