import React, { FC } from "react";
import { View } from "react-native";

import { DitheredImage } from "@/components/DitheredImage";
import { useVideoFromAsset } from "@/hooks/useVideoFromAsset";

interface IProps {
  width: number;
  height: number;
}

export const PlayerVideo: FC<IProps> = React.memo(({ width, height }) => {
  const { currentFrame } = useVideoFromAsset(
    require("@/assets/videos/poolsuite2.mp4"),
    { paused: false, looping: true, volume: 0 },
  );

  return (
    <View
      style={{
        width,
        height,
      }}
    >
      <DitheredImage image={currentFrame} width={width} height={height} />
    </View>
  );
});
