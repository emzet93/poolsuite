import "react-native-reanimated";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform, StatusBar } from "react-native";

import { initLibrary } from "@/store/library";
import { initializePlayer } from "@/store/player/playbackService";
import { setupThemes } from "@/theme";

setupThemes();
initializePlayer();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Chicago: require("../assets/fonts/Chicago.ttf"),
    ChicagoLight: require("../assets/fonts/ChicagoLight.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    initLibrary();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar hidden={Platform.OS === "ios"} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
