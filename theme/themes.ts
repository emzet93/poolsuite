import { AppThemes } from "@/theme/types";
import { normalizeSize } from "@/utils/ui";

export const defaultSpacing = {
  xxs: normalizeSize(4),
  xs: normalizeSize(8),
  s: normalizeSize(16),
  m: normalizeSize(20),
  l: normalizeSize(24),
  xl: normalizeSize(32),
  xxl: normalizeSize(40),
};

export const defaultCardStyle = {
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
  Poolwater: {
    name: "Poolwater",
    imageSource: require("@/assets/images/poolsuite.png"),
    colors: {
      secondary: "#56faaf",
      primary: "#2229ab",
    },
    spacing: defaultSpacing,
    card: defaultCardStyle,
  },
  "Seashore Resort": {
    name: "Seashore Resort",
    imageSource: require("@/assets/images/poolsuite.png"),
    colors: {
      secondary: "#f5d298",
      primary: "#164967",
    },
    spacing: defaultSpacing,
    card: defaultCardStyle,
  },
  "Bubba Hubba": {
    name: "Bubba Hubba",
    imageSource: require("@/assets/images/poolsuite.png"),
    colors: {
      secondary: "#ea0e49",
      primary: "#0f1448",
    },
    spacing: defaultSpacing,
    card: defaultCardStyle,
  },
  "Peach Meringue": {
    name: "Peach Meringue",
    imageSource: require("@/assets/images/poolsuite.png"),
    colors: {
      secondary: "#e1955e",
      primary: "#0a107a",
    },
    spacing: defaultSpacing,
    card: defaultCardStyle,
  },
  "Green New Deal": {
    name: "Green New Deal",
    imageSource: require("@/assets/images/poolsuite.png"),
    colors: {
      secondary: "#3ec558",
      primary: "#063814",
    },
    spacing: defaultSpacing,
    card: defaultCardStyle,
  },
  "Commodore 69": {
    name: "Commodore 69",
    imageSource: require("@/assets/images/poolsuite.png"),
    colors: {
      secondary: "#b2cbd5",
      primary: "#31373b",
    },
    spacing: defaultSpacing,
    card: defaultCardStyle,
  },
};

export const appThemesList = Object.values(appThemes);
export const defaultTheme = "Poolsuite FM";
