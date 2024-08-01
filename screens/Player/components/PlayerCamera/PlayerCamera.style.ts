import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonsContainer: {
    position: "absolute",
    right: theme.spacing.xs,
    bottom: theme.spacing.xs,
    gap: theme.spacing.xs,
  },
  iconButton: {
    padding: theme.spacing.xs,
    width: theme.spacing.xl * 2,
    height: theme.spacing.xl * 2,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
  },
}));
