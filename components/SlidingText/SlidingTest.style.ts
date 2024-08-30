import { createStyleSheet } from "react-native-unistyles";

export const DividerWidth = 32;

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    overflow: "hidden",
    flexDirection: "row",
  },
  slidingTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    flexDirection: "row",
  },
  textCopy: {
    paddingLeft: DividerWidth,
  },
  textPlaceholder: {
    opacity: 0,
  },
}));
