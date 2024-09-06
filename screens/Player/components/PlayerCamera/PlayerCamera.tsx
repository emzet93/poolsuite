import { makeImageFromView } from "@shopify/react-native-skia";
import * as FileSystem from "expo-file-system";
import { createAssetAsync, requestPermissionsAsync } from "expo-media-library";
import React, { FC, useRef, useState } from "react";
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
import { Noise } from "@/components/Noise";
import { Text } from "@/components/Text";
import { CameraError } from "@/screens/Player/components/CameraError";
import { isIOS } from "@/utils/device";

import { cameraResolution } from "./constants";
import { stylesheet } from "./PlayerCamera.style";
import { useCameraPermission } from "./useCameraPermission";

interface IProps {
  onExit: () => void;
}

export const PlayerCamera: FC<IProps> = React.memo(({ onExit }) => {
  const { styles, theme } = useStyles(stylesheet);

  const cameraRef = useRef<Camera | null>(null);
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>("back");
  const device = useCameraDevice(cameraPosition);
  const {
    permission: cameraPermission,
    isRequestingPermission: isRequestingCamera,
  } = useCameraPermission();
  const [libraryPermissionError, setLibraryPermissionError] = useState(false);
  const [isPreviewStarted, setIsPreviewStarted] = useState(false);

  const switchCamera = () =>
    setCameraPosition((p) => (p === "front" ? "back" : "front"));

  const format = useCameraFormat(device, [
    { videoResolution: cameraResolution },
  ]);

  const frameProcessor = useSkiaFrameProcessor(
    (frame) => {
      "worklet";
      frame.render(
        getDitheredImagePaint(theme.colors.primary, theme.colors.secondary),
      );
    },
    [theme.colors.primary, theme.colors.secondary, getDitheredImagePaint],
  );

  const onTakePhoto = async () => {
    try {
      const libraryPermission = await requestPermissionsAsync(false, ["photo"]);

      if (libraryPermission.status !== "granted") {
        setLibraryPermissionError(true);
        return;
      }

      const snapshot = await makeImageFromView(cameraRef);
      // TODO: Draw on off screen canvas together with other elements

      if (snapshot) {
        const fileUri = `${FileSystem.documentDirectory}poolsuite-photo.png`;

        await FileSystem.writeAsStringAsync(
          fileUri,
          snapshot.encodeToBase64(),
          {
            encoding: FileSystem.EncodingType.Base64,
          },
        );

        await createAssetAsync(fileUri);
      }
    } catch (error) {
      console.error("Error saving file:", error);
    }
  };

  const showCamera = cameraPermission === "granted" && device;
  const showCameraButtons = showCamera && !libraryPermissionError;

  return (
    <View style={styles.container}>
      {!isPreviewStarted && <Noise style={styles.loadingContainer} animated />}

      {(cameraPermission === "denied" || cameraPermission === "restricted") &&
        !isRequestingCamera && (
          <CameraError message="Please open settings and give Poolsuite FM access to your camera" />
        )}

      {showCamera && libraryPermissionError && (
        <CameraError message="Please open settings and give Poolsuite FM access to your photos" />
      )}

      {showCamera && !libraryPermissionError && (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          device={device}
          frameProcessor={frameProcessor}
          isActive
          resizeMode="cover"
          format={isIOS ? format : undefined}
          onStarted={() => {
            setTimeout(() => {
              setIsPreviewStarted(true);
            }, 1000);
          }}
        />
      )}

      <View style={styles.buttonsContainer}>
        {showCameraButtons && (
          <Card style={styles.iconButton} onPress={onTakePhoto} inverted>
            <Text size="xs" weight="bold" color="secondary">
              Photo
            </Text>
          </Card>
        )}
        {showCameraButtons && (
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
