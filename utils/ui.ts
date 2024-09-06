import { PixelRatio } from "react-native";
import { UnistylesRuntime } from "react-native-unistyles";

const referenceScreenHeight = 844; // iPhone 14
const minScale = 0.75;

const scale = Math.max(
  minScale,
  UnistylesRuntime.screen.height / referenceScreenHeight,
);

export const normalizeSize = (size: number) =>
  PixelRatio.roundToNearestPixel(scale * size);
