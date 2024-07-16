import { Canvas, SkImage, Image, Skia, rect } from "@shopify/react-native-skia";
import axios from "axios";
import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { SharedValue, runOnUI, useSharedValue } from "react-native-reanimated";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import {
  barsNumber,
  drawProgressBars,
  drawWaveform,
  joinWaveformData,
  placeholderData,
  waveformHeight,
  waveformWidth,
} from "@/components/Waveform/utils";

interface IProps {
  waveformUrl: string;
  progress: number;
  duration: number;
}

// Use offscreen painting instead of declarative api as it seems to be much more performant both on initial mount
// and updates
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
            const groupedSamples = joinWaveformData(samples, barsNumber);
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
