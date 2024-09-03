import { useCallback, useEffect, useMemo, useState } from "react";
import { AppState } from "react-native";
import { Camera } from "react-native-vision-camera";

export const useCameraPermission = () => {
  const [isRequestingPermission, setIsRequestingPermission] = useState(
    Camera.getCameraPermissionStatus() !== "granted",
  );
  const [permission, setPermission] = useState(() =>
    Camera.getCameraPermissionStatus(),
  );

  const requestPermission = useCallback(async () => {
    if (Camera.getCameraPermissionStatus() === "granted") {
      return;
    }

    setIsRequestingPermission(true);
    const newPermission = await Camera.requestCameraPermission();
    setPermission(newPermission);
    setIsRequestingPermission(false);
  }, []);

  useEffect(() => {
    // Request permission on camera mount
    requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    // Refresh permission when app state changes, as user might have allowed it in Settings
    const listener = AppState.addEventListener("change", () => {
      setPermission(Camera.getCameraPermissionStatus());
    });
    return () => listener.remove();
  }, []);

  return useMemo(
    () => ({
      permission,
      requestPermission,
      isRequestingPermission,
    }),
    [permission, requestPermission, isRequestingPermission],
  );
};
