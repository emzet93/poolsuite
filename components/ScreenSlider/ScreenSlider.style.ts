import { Dimensions } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet((theme, runtime) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  screen: {
    width: Dimensions.get("window").width,
  },
}));
