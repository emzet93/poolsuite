import { Canvas, Rect } from "@shopify/react-native-skia";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

const waveformWidth = UnistylesRuntime.screen.width - 16 - 4;
const waveformHeight = 50;

const barWidth = 1;
const gap = 1;
const barsNumber = Math.floor(waveformWidth / (barWidth + 1));

const baseArray: number[] = new Array(barsNumber).fill(waveformHeight / 2);
console.log("BAR NUMBER", barsNumber);

interface IProps {
  waveformUrl: string;
  progress: number;
  duration: number;
}

export const Waveform: FC<IProps> = ({ waveformUrl, progress, duration }) => {
  const { theme } = useStyles();
  const [waveform, setWaveform] = useState(baseArray);

  const highlightedBars = Math.floor((progress * barsNumber) / duration);

  console.log("render");

  useEffect(() => {
    axios.get(waveformUrl).then((response) => {
      const referenceHeight: number = response.data.height;
      const samples: number[] = response.data.samples;
      const groupedSamples = transformArray(samples, barsNumber);
      const _waveform = groupedSamples.map((bar) =>
        Math.round((bar * waveformHeight) / referenceHeight),
      );
      setWaveform(_waveform);
    });
  }, [waveformUrl]);

  return (
    <Canvas
      style={{
        width: waveformWidth,
        height: waveformHeight,
        backgroundColor: theme.colors.primary,
      }}
    >
      {waveform.map((height, barIndex) => {
        if (barIndex > highlightedBars) {
          return (
            <>
              {new Array(Math.ceil(height / (barWidth + gap)))
                .fill(0)
                .map((_, index) => (
                  <Rect
                    key={`rect-${barIndex}-${index}`}
                    width={barWidth}
                    height={barWidth}
                    color={theme.colors.secondary}
                    x={barIndex * (barWidth + gap)}
                    y={waveformHeight - index * (barWidth + gap)}
                  />
                ))}
            </>
          );
        }

        return (
          <Rect
            key={`bar-${barIndex}`}
            x={barIndex * (barWidth + gap)}
            y={waveformHeight - height}
            width={barWidth}
            height={height}
            color={theme.colors.secondary}
          />
        );
      })}
    </Canvas>
  );
};

function transformArray(arr: number[], m: number): number[] {
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
