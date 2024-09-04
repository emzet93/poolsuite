import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  logo: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "15%",
    right: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    position: "absolute",
    right: theme.spacing.xs,
    bottom: theme.spacing.xs,
    gap: theme.spacing.xs,
  },
  button: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
  },
}));
