import "react-native-reanimated";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";

import { Intro } from "@/components/Intro";
import { initLibrary } from "@/store/library";
import { playChannel, usePlayerStore } from "@/store/player";
import { initializePlayer } from "@/store/player/playbackService";
import { setupThemes } from "@/theme";

setupThemes();
initializePlayer();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showIntro, setShowIntro] = useState(true);

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
    initLibrary()
      .then((channels) => {
        if (!usePlayerStore.getState().queue) {
          playChannel(channels[0], false);
        }
      })
      .catch(() => {});
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar hidden />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      {loaded && showIntro && <Intro close={() => setShowIntro(false)} />}
    </>
  );
}
