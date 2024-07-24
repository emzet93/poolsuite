import React, { FC, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useSkiaFrameProcessor,
} from "react-native-vision-camera";

import { ditheredImagePaint } from "@/components/DitheredImage";

interface IProps {
  width: number;
  height: number;
}

export const PlayerCamera: FC<IProps> = React.memo(({ width, height }) => {
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const frameProcessor = useSkiaFrameProcessor(
    (frame) => {
      "worklet";
      frame.render(ditheredImagePaint);
    },
    [ditheredImagePaint],
  );

  if (!hasPermission) {
    return true;
  }

  if (device == null) {
    return true;
  }

  return (
    <Camera
      style={StyleSheet.absoluteFillObject}
      device={device}
      frameProcessor={frameProcessor}
      isActive={true}
    />
  );

  // return (
  //   <View
  //     style={{
  //       width,
  //       height,
  //     }}
  //   >
  //     <DitheredImage image={currentFrame} width={width} height={height} />
  //   </View>
  // );
});
