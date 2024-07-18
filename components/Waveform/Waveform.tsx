import { Canvas, SkImage, Image } from "@shopify/react-native-skia";
import axios from "axios";
import React, { FC, useEffect, useRef } from "react";
import { runOnUI, useSharedValue } from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import { ThemeFilter } from "@/components/Filters";
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
    const waveformData = useSharedValue(placeholderData);
    const waveformUrlRef = useRef<string>();

    if (waveformUrl !== waveformUrlRef.current) {
      waveformUrlRef.current = waveformUrl;
      waveformData.value = placeholderData;
      runOnUI(drawWaveform)(waveformImage, placeholderData);
      runOnUI(drawProgressBars)(
        progressImage,
        placeholderData,
        Math.floor((progress.value * barsNumber) / duration.value),
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
            runOnUI(drawWaveform)(waveformImage, data);
            runOnUI(drawProgressBars)(
              progressImage,
              data,
              Math.floor((progress.value * barsNumber) / duration.value),
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
      waveformData,
      progressImage,
      progress,
      duration,
    ]);

    if (progress.value !== _progress || duration.value !== _duration) {
      progress.value = _progress;
      duration.value = _duration;
      runOnUI(drawProgressBars)(
        progressImage,
        waveformData.value,
        Math.floor((_progress * barsNumber) / _duration),
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
        <ThemeFilter width={waveformWidth} height={waveformHeight} />
      </Canvas>
    );
  },
);
