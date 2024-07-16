import { Canvas, Group, Rect } from "@shopify/react-native-skia";
import axios from "axios";
import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { SharedValue, makeMutable, runOnUI } from "react-native-reanimated";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

const waveformWidth = UnistylesRuntime.screen.width - 16 - 4;
const waveformHeight = 50;

const barWidth = 1;
const gap = 1;
const barsNumber = Math.floor(waveformWidth / (barWidth + gap));
const rectsNumber = Math.floor(waveformHeight / (barWidth + gap));

const baseArray: number[] = new Array(barsNumber).fill(waveformHeight / 2);

interface WaveformRect {
  opacity: SharedValue<number>;
  x: SharedValue<number>;
  y: SharedValue<number>;
  width: number;
  height: number;
}

const _matrix: WaveformRect[][] = [];

for (let barIndex = 0; barIndex < barsNumber; barIndex++) {
  _matrix[barIndex] = [];

  for (let rectIndex = 0; rectIndex < rectsNumber; rectIndex++) {
    _matrix[barIndex][rectIndex] = {
      opacity: makeMutable(1),
      x: makeMutable(barIndex * (barWidth + gap)),
      y: makeMutable(waveformHeight - rectIndex * (barWidth + gap)),
      width: barWidth,
      height: barWidth,
    };
  }
}

const regenerateMatrix = (mutableMatrix: WaveformRect[][], data: number[]) => {
  "worklet";

  for (let barIndex = 0; barIndex < barsNumber; barIndex++) {
    const height = data[barIndex];

    for (let rectIndex = 0; rectIndex < rectsNumber; rectIndex++) {
      const opacity = rectIndex * (barWidth + gap) > height ? 0 : 1;
      mutableMatrix[barIndex][rectIndex].opacity.value = opacity;
    }
  }
};

interface ProgressRect {
  opacity: SharedValue<number>;
  x: SharedValue<number>;
  y: SharedValue<number>;
  width: number;
  height: SharedValue<number>;
}
const _progress: ProgressRect[] = [];

for (let barIndex = 0; barIndex < barsNumber; barIndex++) {
  _progress[barIndex] = {
    opacity: makeMutable(0),
    x: makeMutable(barIndex * (barWidth + gap)),
    y: makeMutable(0),
    width: barWidth,
    height: makeMutable(0),
  };
}

const regenerateProgress = (progress: number, duration: number) => {
  "worklet";

  const highlightedBars = Math.floor((progress * barsNumber) / duration);

  for (let barIndex = 0; barIndex < barsNumber; barIndex++) {
    _progress[barIndex].opacity.value = barIndex < highlightedBars ? 1 : 0;
  }
};

const regenerateProgressData = (data: number[]) => {
  "worklet";

  for (let barIndex = 0; barIndex < barsNumber; barIndex++) {
    _progress[barIndex].height.value = data[barIndex];
    _progress[barIndex].y.value = waveformHeight - data[barIndex];
  }
};

interface IProps {
  waveformUrl: string;
  progress: number;
  duration: number;
}

export const Waveform: FC<IProps> = React.memo(
  ({ waveformUrl, progress, duration }) => {
    const { theme } = useStyles();

    const [matrix] = useState(_matrix);
    const [progressBars] = useState(_progress);

    const _url = useRef<string>();

    if (waveformUrl !== _url.current) {
      _url.current = waveformUrl;
      runOnUI(() => {
        regenerateMatrix(matrix, baseArray);
        regenerateProgressData(baseArray);
      })();
    }

    useEffect(() => {
      let isCancelled = false;

      axios
        .get(waveformUrl)
        .then((response) => {
          if (!isCancelled) {
            runOnUI(() => {
              const referenceHeight: number = response.data.height;
              const samples: number[] = response.data.samples;
              const groupedSamples = transformArray(samples, barsNumber);
              const data = groupedSamples.map((bar, index) =>
                Math.round((bar * waveformHeight) / referenceHeight),
              );
              regenerateMatrix(matrix, data);
              regenerateProgressData(data);
            })();
          }
        })
        .catch((e) => {
          console.log("Fetch waveform error", e);
        });

      return () => {
        isCancelled = true;
      };
    }, [matrix, waveformUrl]);

    useEffect(() => {
      runOnUI(() => {
        regenerateProgress(progress, duration);
      })();
    }, [progress, duration]);

    return (
      <Canvas
        style={{
          width: waveformWidth,
          height: waveformHeight,
          backgroundColor: theme.colors.primary,
        }}
      >
        <WaveformBase waveformData={matrix} gap={gap} barWidth={barWidth} />
        <ProgressBar progressData={progressBars} />
      </Canvas>
    );
  },
);

const WaveformBase: FC<{
  waveformData: WaveformRect[][];
  gap: number;
  barWidth: number;
}> = React.memo(({ waveformData }) => {
  const { theme } = useStyles();

  return (
    <Group color={theme.colors.secondary}>
      {waveformData.map((bar, barIndex) => (
        <Fragment key={`waveformBar-${barIndex}`}>
          {bar.map((rect, index) => {
            return (
              <Rect
                key={`waveformRect-${barIndex}-${index}`}
                opacity={rect.opacity}
                width={rect.width}
                height={rect.height}
                x={rect.x}
                y={rect.y}
              />
            );
          })}
        </Fragment>
      ))}
    </Group>
  );
});

const ProgressBar: FC<{ progressData: ProgressRect[] }> = React.memo(
  ({ progressData }) => {
    const { theme } = useStyles();

    return (
      <Group color={theme.colors.secondary}>
        {progressData.map((bar, index) => (
          <Rect
            key={`progressBar-${index}`}
            opacity={bar.opacity}
            x={bar.x}
            y={bar.y}
            width={bar.width}
            height={bar.height}
          />
        ))}
      </Group>
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
