import { Canvas, Image } from "@shopify/react-native-skia";
import React from "react";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import { RetroFilter } from "@/components/RetroFilter";
import { useVideoFromAsset } from "@/hooks/useVideoFromAsset";

export const PlayerVideo = React.memo(() => {
  const { theme } = useStyles();
  const stageWidth = UnistylesRuntime.screen.width - theme.spacing.xs * 2;
  const stageHeight = stageWidth;

  const { currentFrame } = useVideoFromAsset(
    require("@/assets/videos/poolsuite.mp4"),
    { paused: false, looping: true, volume: 0 },
  );
  // const resultImage = useSharedValue<SkImage | null>(null);
  //
  // const iteration = useSharedValue(0);
  //
  // useAnimatedReaction(
  //   () => {
  //     return currentFrame.value;
  //   },
  //   (currentValue, previousValue) => {
  //     if (currentValue && currentValue !== previousValue) {
  //       if (iteration.value % 100 === 0) {
  //         transformImage(currentValue, resultImage, stageWidth, stageHeight);
  //       }
  //
  //       iteration.value += 1;
  //     }
  //   },
  // );

  return (
    <Canvas
      style={{
        width: stageWidth,
        height: stageHeight,
      }}
    >
      <Image
        image={currentFrame}
        fit="cover"
        x={0}
        y={0}
        width={stageWidth}
        height={stageHeight}
      />
      <RetroFilter width={stageWidth} height={stageHeight} />
    </Canvas>
  );
});
