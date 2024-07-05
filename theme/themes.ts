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

export const appThemes: AppThemes = {
  "Poolsuite FM": {
    name: "Poolsuite FM",
    colors: {
      secondary: "#faeed9",
      primary: "#000",
    },
    spacing: defaultSpacing,
  },
  "Pink Lemonade": {
    name: "Pink Lemonade",
    colors: {
      secondary: "#f1b1ff",
      primary: "#292d70",
    },
    spacing: defaultSpacing,
  },
};

export const appThemesList = Object.values(appThemes);
