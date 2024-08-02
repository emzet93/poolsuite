import { rect, Skia, SkImage } from "@shopify/react-native-skia";
import { SharedValue } from "react-native-reanimated";
import { UnistylesRuntime } from "react-native-unistyles";

import { shadowSizeConfig } from "@/components/Card";
import { defaultSpacing } from "@/theme";

export const waveformWidth =
  UnistylesRuntime.screen.width -
  defaultSpacing.xs * 2 -
  shadowSizeConfig.big -
  1;
export const waveformHeight = 40;

export const barWidth = 1;
export const gap = 1;
export const barsNumber = Math.floor(waveformWidth / (barWidth + gap));
export const placeholderData: number[] = new Array(barsNumber).fill(
  waveformHeight / 2,
);

export const joinWaveformData = (arr: number[], m: number): number[] => {
  "worklet";
  const n = arr.length;
  if (m > n || m <= 0) {
    throw new Error("Invalid value of m");
  }

  const result: number[] = [];
  const groupSize = n / m;

  for (let i = 0; i < m; i++) {
    let start = Math.floor(i * groupSize);
    let end = Math.floor((i + 1) * groupSize);

    // To handle the case when n is not perfectly divisible by m
    if (i === m - 1) {
      end = n;
    }

    let sum = 0;
    for (let j = start; j < end; j++) {
      sum += arr[j];
    }

    result.push(sum / (end - start));
  }

  return result;
};

export const drawWaveform = (
  image: SharedValue<SkImage | null>,
  data: number[],
) => {
  "worklet";
  const surface = Skia.Surface.MakeOffscreen(waveformWidth, waveformHeight)!;
  const canvas = surface.getCanvas();
  const paint = Skia.Paint();
  paint.setColor(Skia.Color("#FFF"));

  for (let barIndex = 0; barIndex < barsNumber; barIndex++) {
    const height = data[barIndex] / (barWidth + gap);

    for (let rectIndex = 0; rectIndex < height; rectIndex++) {
      canvas.drawRect(
        rect(
          barIndex * (barWidth + gap),
          waveformHeight - rectIndex * (barWidth + gap) - gap,
          barWidth,
          barWidth,
        ),
        paint,
      );
    }
  }

  surface.flush();
  image.value = surface.makeImageSnapshot();
};

export const drawProgressBars = (
  image: SharedValue<SkImage | null>,
  data: number[],
  highlightedBars: number,
) => {
  "worklet";
  const surface = Skia.Surface.MakeOffscreen(waveformWidth, waveformHeight)!;
  const canvas = surface.getCanvas();
  const paint = Skia.Paint();
  paint.setColor(Skia.Color("#FFF"));

  for (let barIndex = 0; barIndex < highlightedBars; barIndex++) {
    const height = data[barIndex];

    canvas.drawRect(
      rect(
        barIndex * (barWidth + gap),
        waveformHeight - height,
        barWidth,
        height,
      ),
      paint,
    );
  }

  surface.flush();
  image.value = surface.makeImageSnapshot();
};
