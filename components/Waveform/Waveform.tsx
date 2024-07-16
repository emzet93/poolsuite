import { Canvas, SkImage, Image, Skia, rect } from "@shopify/react-native-skia";
import axios from "axios";
import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { SharedValue, runOnUI, useSharedValue } from "react-native-reanimated";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

const waveformWidth = UnistylesRuntime.screen.width - 16 - 4;
const waveformHeight = 40;

const barWidth = 1;
const gap = 1;
const barsNumber = Math.floor(waveformWidth / (barWidth + gap));
const placeholderData: number[] = new Array(barsNumber).fill(
  waveformHeight / 2,
);

interface IProps {
  waveformUrl: string;
  progress: number;
  duration: number;
}

// Use offscreen painting instead of declarative api as it seems to be much more performant both on initial mount
// and updates
const drawWaveform = (
  image: SharedValue<SkImage | null>,
  data: number[],
  color: string,
) => {
  "worklet";
  const surface = Skia.Surface.MakeOffscreen(waveformWidth, waveformHeight)!;
  const canvas = surface.getCanvas();
  const paint = Skia.Paint();
  paint.setColor(Skia.Color(color));

  for (let barIndex = 0; barIndex < barsNumber; barIndex++) {
    const height = data[barIndex] / (barWidth + gap);

    for (let rectIndex = 0; rectIndex < height; rectIndex++) {
      canvas.drawRect(
        rect(
          barIndex * (barWidth + gap),
          waveformHeight - rectIndex * (barWidth + gap),
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

const drawProgressBars = (
  image: SharedValue<SkImage | null>,
  data: number[],
  highlightedBars: number,
  color: string,
) => {
  "worklet";
  const surface = Skia.Surface.MakeOffscreen(waveformWidth, waveformHeight)!;
  const canvas = surface.getCanvas();
  const paint = Skia.Paint();
  paint.setColor(Skia.Color(color));

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

export const Waveform: FC<IProps> = React.memo(
  ({ waveformUrl, progress: _progress, duration: _duration }) => {
    const { theme } = useStyles();

    const waveformImage = useSharedValue<SkImage | null>(null);
    const progressImage = useSharedValue<SkImage | null>(null);
    const progress = useSharedValue(_progress);
    const duration = useSharedValue(_duration);
    const color = useSharedValue(theme.colors.secondary);
    const waveformData = useSharedValue(placeholderData);

    const waveformUrlRef = useRef<string>();

    if (waveformUrl !== waveformUrlRef.current) {
      waveformUrlRef.current = waveformUrl;
      waveformData.value = placeholderData;
      runOnUI(drawWaveform)(waveformImage, placeholderData, color.value);
      runOnUI(drawProgressBars)(
        progressImage,
        placeholderData,
        Math.floor((progress.value * barsNumber) / duration.value),
        color.value,
      );
    }

    useEffect(() => {
      let isCancelled = false;

      axios
        .get(waveformUrl)
        .then((response) => {
          if (!isCancelled) {
            const referenceHeight: number = response.data.height;
            const samples: number[] = response.data.samples;
            const groupedSamples = transformArray(samples, barsNumber);
            const data = groupedSamples.map((bar, index) =>
              Math.round((bar * waveformHeight) / referenceHeight),
            );

            waveformData.value = data;
            runOnUI(drawWaveform)(waveformImage, data, color.value);
            runOnUI(drawProgressBars)(
              progressImage,
              data,
              Math.floor((progress.value * barsNumber) / duration.value),
              color.value,
            );
          }
        })
        .catch((e) => {
          console.log("Fetch waveform error", e);
        });

      return () => {
        isCancelled = true;
      };
    }, [
      waveformUrl,
      waveformImage,
      color,
      waveformData,
      progressImage,
      progress,
      duration,
    ]);

    useEffect(() => {
      if (color.value !== theme.colors.secondary) {
        color.value = theme.colors.secondary;
        runOnUI(drawWaveform)(
          waveformImage,
          waveformData.value,
          theme.colors.secondary,
        );
        runOnUI(drawProgressBars)(
          progressImage,
          waveformData.value,
          Math.floor((progress.value * barsNumber) / duration.value),
          theme.colors.secondary,
        );
      }
    }, [
      theme.colors.secondary,
      color,
      waveformImage,
      progressImage,
      waveformData,
      progress,
      duration,
    ]);

    useEffect(() => {
      if (progress.value !== _progress || duration.value !== _duration) {
        progress.value = _progress;
        duration.value = _duration;

        runOnUI(drawProgressBars)(
          progressImage,
          waveformData.value,
          Math.floor((_progress * barsNumber) / _duration),
          color.value,
        );
      }
    }, [
      _progress,
      _duration,
      color,
      waveformData,
      progress,
      duration,
      progressImage,
    ]);

    return (
      <Canvas
        style={{
          width: waveformWidth,
          height: waveformHeight,
          backgroundColor: theme.colors.primary,
        }}
      >
        <Image
          image={waveformImage}
          x={0}
          y={0}
          width={waveformWidth}
          height={waveformHeight}
        />
        <Image
          image={progressImage}
          x={0}
          y={0}
          width={waveformWidth}
          height={waveformHeight}
        />
      </Canvas>
    );
  },
);

function transformArray(arr: number[], m: number): number[] {
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
}
