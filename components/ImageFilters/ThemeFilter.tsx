import { BackdropFilter, ColorMatrix } from "@shopify/react-native-skia";
import React, { FC, useMemo } from "react";
import { useStyles } from "react-native-unistyles";

import { createColorMatrix } from "@/components/ImageFilters/utils";

interface IProps {
  width: number;
  height: number;
}

export const ThemeFilter: FC<IProps> = ({ width, height }) => {
  const { theme } = useStyles();
  const themeColorMatrix = useMemo(() => {
    return createColorMatrix(theme.colors.primary, theme.colors.secondary);
  }, [theme]);

  return (
    <BackdropFilter
      clip={{ x: 0, y: 0, width, height }}
      filter={<ColorMatrix matrix={themeColorMatrix} />}
    />
  );
};
