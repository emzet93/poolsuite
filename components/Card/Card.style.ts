import { createStyleSheet } from "react-native-unistyles";

export const shadowSizeConfig = {
  small: 1,
  big: 3,
};

export const stylesheet = createStyleSheet((theme) => ({
  container: (shadowSize: keyof typeof shadowSizeConfig) => ({
    paddingRight: shadowSizeConfig[shadowSize],
    paddingBottom: shadowSizeConfig[shadowSize],
  }),
  card: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primary,
    borderWidth: theme.card.borderWidth,
    borderRadius: theme.card.borderRadius,
    zIndex: 1,
  },
  card_inverted: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.secondary,
  },
  shadow: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.card.borderRadius,
  },
  placeholderShadow: (shadowSize: keyof typeof shadowSizeConfig) => ({
    position: "absolute",
    top: 0,
    right: shadowSizeConfig[shadowSize],
    bottom: shadowSizeConfig[shadowSize],
    left: 0,
  }),
  offsetShadow: (shadowSize: keyof typeof shadowSizeConfig) => ({
    position: "absolute",
    top: shadowSizeConfig[shadowSize],
    left: shadowSizeConfig[shadowSize],
    right: 0,
    bottom: 0,
  }),
  shadow_inverted: {
    backgroundColor: theme.colors.secondary,
  },
}));
