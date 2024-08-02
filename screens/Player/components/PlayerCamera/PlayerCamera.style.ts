import { StyleSheet } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  permissionDeniedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: "15%",
  },
  permissionsHeader: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.xxs / 2,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
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
