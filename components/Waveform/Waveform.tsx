import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

const width = UnistylesRuntime.screen.width - 16 - 4;
const height = 50;

const barWidth = 1;
const gap = 1;
const barsNumber = Math.floor(width / (barWidth + 1));

const baseArray: number[] = new Array(barsNumber).fill(height / 2);
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
        Math.round((bar * height) / referenceHeight),
      );
      setWaveform(_waveform);
    });
  }, [waveformUrl]);

  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: theme.colors.primary,
      }}
    >
      {waveform.map((height, index) => {
        if (index > highlightedBars) {
          return (
            <View
              key={index}
              style={{
                position: "absolute",
                bottom: 0,
                height,
                left: index * (barWidth + gap),
                width: barWidth,
                flexDirection: "column",
                gap,
              }}
            >
              {new Array(Math.ceil(height / (barWidth + gap)))
                .fill(0)
                .map((_, index) => (
                  <View
                    key={index}
                    style={{
                      width: barWidth,
                      height: barWidth,
                      backgroundColor: theme.colors.secondary,
                    }}
                  />
                ))}
            </View>
          );
        }

        return (
          <View
            key={index}
            style={{
              position: "absolute",
              bottom: 0,
              height,
              left: index * (barWidth + gap),
              width: barWidth,
              backgroundColor: theme.colors.secondary,
            }}
          />
        );
      })}
    </View>
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
