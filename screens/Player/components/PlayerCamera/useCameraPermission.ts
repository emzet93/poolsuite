import { useCallback, useEffect, useMemo, useState } from "react";
import { AppState } from "react-native";
import { Camera } from "react-native-vision-camera";

export const useCameraPermission = () => {
  const [permission, setPermission] = useState(() =>
    Camera.getCameraPermissionStatus(),
  );

  const requestPermission = useCallback(async () => {
    const newPermission = await Camera.requestCameraPermission();
    setPermission(newPermission);
  }, []);

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
    }),
    [permission, requestPermission],
  );
};
