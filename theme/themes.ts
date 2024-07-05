import { AppThemes, Theme } from "@/theme/types";

const defaultSpacing = {
  xxs: 4,
  xs: 8,
  s: 16,
  m: 20,
  l: 24,
  xl: 32,
  xxl: 40,
};

const defaultCardStyle = {
  borderRadius: 4,
  borderWidth: 1,
};

export const appThemes: AppThemes = {
  "Poolsuite FM": {
    name: "Poolsuite FM",
    imageSource: require("@/assets/images/poolsuite.png"),
    colors: {
      secondary: "#faeed9",
      primary: "#000",
    },
    spacing: defaultSpacing,
    card: defaultCardStyle,
  },
  "Pink Lemonade": {
    name: "Pink Lemonade",
    imageSource: require("@/assets/images/poolsuite.png"),
    colors: {
      secondary: "#f1b1ff",
      primary: "#292d70",
    },
    spacing: defaultSpacing,
    card: defaultCardStyle,
  },
};

export const appThemesList = Object.values(appThemes);
