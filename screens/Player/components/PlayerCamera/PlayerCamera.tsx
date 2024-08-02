import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";
import {
  Camera,
  CameraPosition,
  useCameraDevice,
  useCameraFormat,
  useSkiaFrameProcessor,
} from "react-native-vision-camera";

import { Card } from "@/components/Card";
import { getDitheredImagePaint } from "@/components/DitheredImage/utils";
import { Text } from "@/components/Text";
import { isIOS } from "@/utils/device";

import { cameraResolution } from "./constants";
import { stylesheet } from "./PlayerCamera.style";
import { useCameraPermission } from "./useCameraPermission";

interface IProps {
  onExit: () => void;
}

// TODO2: nice ui for camera loading
export const PlayerCamera: FC<IProps> = React.memo(({ onExit }) => {
  const { styles, theme } = useStyles(stylesheet);

  const [cameraPosition, setCameraPosition] = useState<CameraPosition>("back");
  const device = useCameraDevice(cameraPosition);
  const { permission, requestPermission } = useCameraPermission();

  const switchCamera = () =>
    setCameraPosition((p) => (p === "front" ? "back" : "front"));

  const format = useCameraFormat(device, [
    { videoResolution: cameraResolution },
  ]);

  useEffect(() => {
    if (permission === "not-determined") {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const frameProcessor = useSkiaFrameProcessor(
    (frame) => {
      "worklet";
      frame.render(
        getDitheredImagePaint(theme.colors.primary, theme.colors.secondary),
      );
    },
    [theme.colors.primary, theme.colors.secondary, getDitheredImagePaint],
  );

  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Text color="secondary" weight="bold">
          Loading...
        </Text>
      </View>

      {(permission === "denied" || permission === "restricted") && (
        <View style={styles.permissionDeniedContainer}>
          <View style={styles.permissionsHeader}>
            <Text weight="bold">CAMERA ERROR</Text>
          </View>
          <Text weight="bold" align="center" color="secondary">
            Please open settings and give Poolsuite FM access to your camera
          </Text>
        </View>
      )}

      {permission === "granted" && device && (
        <Camera
          style={styles.camera}
          device={device}
          frameProcessor={frameProcessor}
          isActive
          resizeMode="cover"
          format={isIOS ? format : undefined}
        />
      )}

      <View style={styles.buttonsContainer}>
        {permission === "granted" && (
          <Card style={styles.iconButton} onPress={switchCamera} inverted>
            <Text size="xs" weight="bold" color="secondary">
              Switch
            </Text>
          </Card>
        )}
        <Card style={styles.button} onPress={onExit}>
          <Text size="m" weight="bold" align="center">
            Exit
          </Text>
        </Card>
      </View>
    </View>
  );
});
