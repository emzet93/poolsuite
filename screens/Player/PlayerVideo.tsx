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
