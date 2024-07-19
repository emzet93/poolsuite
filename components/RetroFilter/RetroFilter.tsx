import {
  BackdropFilter,
  ColorMatrix,
  Rect,
  Turbulence,
} from "@shopify/react-native-skia";
import React, { FC, useMemo } from "react";

import { ThemeFilter } from "@/components/Filters";

interface IProps {
  width: number;
  height: number;
}

const halftoneMatrix = [
  0.6, 0.6, 0.6, 0, 0, 0.6, 0.6, 0.6, 0, 0, 0.6, 0.6, 0.6, 0, 0, 0, 0, 0, 1, 0,
];

export const RetroFilter: FC<IProps> = ({ width, height }) => {
  return (
    <>
      <BackdropFilter
        blendMode={"screen"}
        clip={{ x: 0, y: 0, width, height }}
        filter={<ColorMatrix matrix={halftoneMatrix} />}
      />
      <Rect x={0} y={0} width={width} height={height}>
        <Turbulence freqX={0.9} freqY={0.9} octaves={4} />
      </Rect>
      <ThemeFilter width={width} height={height} />
    </>
  );
};
