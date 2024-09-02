import { createStyleSheet } from "react-native-unistyles";

import { PlayerBarHeight } from "@/components/PlayerBar";

export const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  scrollContent: {
    padding: theme.spacing.xs,
    paddingBottom: theme.spacing.xs + runtime.insets.bottom + PlayerBarHeight,
    gap: theme.spacing.xs,
  },
}));
