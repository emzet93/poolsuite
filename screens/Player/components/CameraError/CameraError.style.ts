import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: "15%",
  },
  header: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.xxs / 2,
  },
}));
