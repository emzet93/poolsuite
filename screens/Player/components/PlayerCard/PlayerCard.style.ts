import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme) => ({
  playerCard: {
    flex: 1,
  },
  playerCardContent: {
    flex: 1,
  },
  channelInfo: {
    paddingVertical: theme.spacing.s,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: theme.spacing.s,
    gap: theme.spacing.l,
    alignItems: "center",
  },
  playerInfo: {
    alignItems: "center",
    gap: theme.spacing.xxs,
  },
  playerControls: {
    flexDirection: "row",
  },
  control: {
    padding: theme.spacing.m,
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
  },
}));
