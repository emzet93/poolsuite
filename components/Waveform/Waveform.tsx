import { Canvas, Group, Rect } from "@shopify/react-native-skia";
import axios from "axios";
import React, {
  FC,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

const waveformWidth = UnistylesRuntime.screen.width - 16 - 4;
const waveformHeight = 50;

const barWidth = 1;
const gap = 1;
const barsNumber = Math.floor(waveformWidth / (barWidth + 1));

const baseArray: number[] = new Array(barsNumber).fill(waveformHeight / 2);

interface IProps {
  waveformUrl: string;
  progress: number;
  duration: number;
}

export const Waveform: FC<IProps> = React.memo(
  ({ waveformUrl, progress, duration }) => {
    const { theme } = useStyles();
    const [waveformData, setWaveformData] = useState<number[]>();
    const highlightedBars = Math.floor((progress * barsNumber) / duration);

    const _url = useRef(waveformUrl);

    if (waveformUrl !== _url.current) {
      _url.current = waveformUrl;
      setWaveformData(undefined);
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
            const _waveform = groupedSamples.map((bar) =>
              Math.round((bar * waveformHeight) / referenceHeight),
            );
            setWaveformData(_waveform);
          }
        })
        .catch((e) => {
          console.log("Fetch waveform error", e);
        });

      return () => {
        isCancelled = true;
      };
    }, [waveformUrl]);

    const placeholderOpacity = useDerivedValue(() =>
      waveformData === undefined ? 1 : 0,
    );

    return (
      <Canvas
        style={{
          width: waveformWidth,
          height: waveformHeight,
          backgroundColor: theme.colors.primary,
        }}
      >
        <WaveformBase waveformData={baseArray} opacity={placeholderOpacity} />
        {waveformData && <WaveformBase waveformData={waveformData} />}
        <Group color={theme.colors.secondary}>
          {(waveformData || baseArray)
            .slice(0, highlightedBars)
            .map((height, index) => (
              <ProgressBar
                key={`progressBar-${index}`}
                x={index * (barWidth + gap)}
                y={waveformHeight - height}
                width={barWidth}
                height={height}
              />
            ))}
        </Group>
      </Canvas>
    );
  },
);

const WaveformBase: FC<{
  waveformData: number[];
  opacity?: SharedValue<number>;
}> = React.memo(({ waveformData, opacity }) => {
  const { theme } = useStyles();

  return (
    <Group color={theme.colors.secondary} opacity={opacity}>
      {waveformData.map((height, barIndex) => (
        <Fragment key={`waveformBar-${barIndex}`}>
          {new Array(Math.ceil(height / (barWidth + gap)))
            .fill(0)
            .map((_, index) => (
              <Rect
                key={`waveformRect-${barIndex}-${index}`}
                width={barWidth}
                height={barWidth}
                x={barIndex * (barWidth + gap)}
                y={waveformHeight - index * (barWidth + gap)}
              />
            ))}
        </Fragment>
      ))}
    </Group>
  );
});

const ProgressBar: FC<{ x: number; height: number; y: number; width: number }> =
  React.memo(({ x, y, height, width }) => {
    return (
      <Rect
        x={x}
        y={waveformHeight - height}
        width={barWidth}
        height={height}
      />
    );
  });

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
