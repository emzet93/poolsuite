import { createStyleSheet } from "react-native-unistyles";

import { Theme } from "@/theme/types";

export const textSize = {
  xs: 10,
  s: 12,
  m: 14,
  l: 18,
  xl: 24,
};

export const fontWeight = {
  light: "ChicagoLight",
  bold: "Chicago",
};

export const stylesheet = createStyleSheet((theme) => ({
  text: (
    color: keyof Theme["colors"],
    size: keyof typeof textSize,
    weight: keyof typeof fontWeight,
  ) => ({
    color: theme.colors[color],
    fontSize: textSize[size],
    fontFamily: fontWeight[weight],
  }),
}));
