import { createStyleSheet } from "react-native-unistyles";

const borderRadius = 4;
const borderWidth = 1;

export const shadowSizeConfig = {
  small: 1,
  big: 3,
};

export const stylesheet = createStyleSheet((theme) => ({
  card: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primary,
    borderWidth,
    borderRadius,
  },
  card_inverted: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.secondary,
  },
  shadow: (shadowSize: keyof typeof shadowSizeConfig) => ({
    backgroundColor: theme.colors.primary,
    position: "absolute",
    borderRadius,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    transform: [
      { translateX: shadowSizeConfig[shadowSize] },
      { translateY: shadowSizeConfig[shadowSize] },
    ],
  }),
  shadow_inverted: {
    backgroundColor: theme.colors.secondary,
  },
}));
