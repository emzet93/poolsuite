import { useMemo } from "react";
import { useStyles } from "react-native-unistyles";

import { hexToRgbArray } from "@/components/ImageFilters/utils";

export const useThemeUniforms = () => {
  const { theme } = useStyles();

  return useMemo(
    () => ({
      primary: hexToRgbArray(theme.colors.primary),
      secondary: hexToRgbArray(theme.colors.secondary),
    }),
    [theme.colors.primary, theme.colors.secondary],
  );
};
