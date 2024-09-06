import { createStyleSheet } from "react-native-unistyles";

import { Theme } from "@/theme/types";
import { normalizeSize } from "@/utils/ui";

export const textSize = {
  xs: normalizeSize(10),
  s: normalizeSize(12),
  m: normalizeSize(14),
  l: normalizeSize(18),
  xl: normalizeSize(24),
  xxl: normalizeSize(32),
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
    lineHeight: Math.round(1.2 * textSize[size]),
  }),
}));
