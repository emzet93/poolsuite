import { Canvas, Line } from "@shopify/react-native-skia";
import React, { FC, useEffect, useState } from "react";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

const { width, height } = UnistylesRuntime.screen;

const frames = [
  {
    verticalLineWidth: 0.3,
    horizontalLineWidth: 0.3,
    verticalSpacing: 1,
    horizontalSpacing: 1,
  },
  {
    verticalLineWidth: 0.5,
    horizontalLineWidth: 0.5,
    verticalSpacing: 1,
    horizontalSpacing: 1,
  },
  {
    verticalLineWidth: 0.75,
    horizontalLineWidth: 0.5,
    verticalSpacing: 1,
    horizontalSpacing: 1,
  },
  {
    verticalLineWidth: 0.5,
    horizontalLineWidth: 0.75,
    verticalSpacing: 1,
    horizontalSpacing: 1,
  },
  {
    verticalLineWidth: 1,
    horizontalLineWidth: 1,
    verticalSpacing: 1,
    horizontalSpacing: 1,
  },
];

export const ModalBackdrop: FC = React.memo(() => {
  const { theme } = useStyles();

  const [frame, setFrame] = useState(frames[0]);

  useEffect(() => {
    let index = 0;

    const id = setInterval(() => {
      setFrame((_frame) => {
        if (index === frames.length - 1) {
          clearInterval(id);
          return _frame;
        }

        index += 1;
        return frames[index];
      });
    }, 50);

    return () => {
      clearInterval(id);
    };
  }, []);

  const {
    verticalLineWidth,
    horizontalLineWidth,
    verticalSpacing,
    horizontalSpacing,
  } = frame;

  const numVerticalLines = Math.ceil(
    width / (verticalSpacing + verticalLineWidth),
  );
  const numHorizontalLines = Math.ceil(
    height / (horizontalSpacing + horizontalLineWidth),
  );

  // Create an array of vertical lines
  const verticalLines = [];
  for (let i = 0; i <= numVerticalLines; i++) {
    const x = i * (verticalSpacing + verticalLineWidth);
    verticalLines.push(
      <Line
        key={`v-${i}`}
        p1={{
          x,
          y: 0,
        }}
        p2={{
          x,
          y: height,
        }}
        strokeWidth={verticalLineWidth}
        color={theme.colors.primary}
      />,
    );
  }

  // Create an array of horizontal lines
  const horizontalLines = [];
  for (let i = 0; i <= numHorizontalLines; i++) {
    const y = i * (horizontalSpacing + horizontalLineWidth);
    horizontalLines.push(
      <Line
        key={`h-${i}`}
        p1={{
          x: 0,
          y,
        }}
        p2={{
          x: width,
          y,
        }}
        strokeWidth={horizontalLineWidth}
        color={theme.colors.primary}
      />,
    );
  }

  return (
    <Canvas style={{ width, height }}>
      {verticalLines}
      {horizontalLines}
    </Canvas>
  );
});
