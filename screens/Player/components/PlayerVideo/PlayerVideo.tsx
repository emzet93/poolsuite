import React, { FC } from "react";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { Card } from "@/components/Card";
import { DitheredImage } from "@/components/DitheredImage";
import { Logo } from "@/components/Logo";
import { Text } from "@/components/Text";
import { useDimensions } from "@/hooks/useDimensions";
import { useVideoFromAsset } from "@/hooks/useVideoFromAsset";

import { stylesheet } from "./PlayerVideo.style";

interface IProps {
  openCamera: () => void;
}

export const PlayerVideo: FC<IProps> = React.memo(({ openCamera }) => {
  const { styles } = useStyles(stylesheet);
  const { width, height, onLayout } = useDimensions();

  const { currentFrame } = useVideoFromAsset(
    require("@/assets/videos/poolsuite2.mp4"),
    { paused: false, looping: true, volume: 0 },
  );

  return (
    <View style={styles.container} onLayout={onLayout}>
      <DitheredImage image={currentFrame} width={width} height={height} />
      <View style={styles.logo}>
        <Logo />
      </View>
      <View style={styles.buttonsContainer}>
        <Card style={styles.button} onPress={openCamera}>
          <Text size="m" weight="bold">
            PoolCam
          </Text>
        </Card>
      </View>
    </View>
  );
});
