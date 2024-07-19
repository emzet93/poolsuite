import React from "react";
import { View } from "react-native";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import { DitheredImage } from "@/components/DitheredImage";
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
    <View
      style={{
        width: stageWidth,
        height: stageHeight,
      }}
    >
      <DitheredImage
        image={currentFrame}
        width={stageWidth}
        height={stageHeight}
      />
    </View>
  );
});
