import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: theme.card.borderRadius,
  },
  header: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    right: 0,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
  },
  list: {
    paddingHorizontal: theme.spacing.s,
    paddingBottom: theme.spacing.xs,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.s,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.card.borderRadius,
  },
  item_active: {
    backgroundColor: theme.colors.secondary,
  },
  noise: {
    flex: 0,
    height: theme.spacing.xs * 1.5,
  },
}));
