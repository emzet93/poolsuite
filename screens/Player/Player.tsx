import { Canvas, Image } from "@shopify/react-native-skia";
import React, { FC } from "react";
import { View } from "react-native";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import { Card } from "@/components/Card";
import { RetroFilter } from "@/components/RetroFilter";
import { Text } from "@/components/Text";
import { useVideoFromAsset } from "@/hooks/useVideoFromAsset";

import { stylesheet } from "./Player.style";

export const Player: FC = () => {
  const { styles, theme } = useStyles(stylesheet);

  const stageWidth = UnistylesRuntime.screen.width - theme.spacing.xs * 2;
  const stageHeight = stageWidth;

  const { currentFrame } = useVideoFromAsset(
    require("@/assets/videos/poolsuite.mp4"),
    { paused: false, looping: true, volume: 0 },
  );

  return (
    <View style={styles.container}>
      <Card
        containerStyle={styles.cameraCard}
        style={styles.cameraCardContent}
        shadowSize="big"
      >
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
      </Card>

      <Card
        containerStyle={styles.playerCard}
        style={styles.card}
        shadowSize="big"
      >
        <Text size="l" weight="bold">
          Poolsuite
        </Text>
      </Card>
    </View>
  );
};
