import React, { FC, useRef } from "react";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useStyles, UnistylesRuntime } from "react-native-unistyles";

import { PlayerBar, PlayerBarHeight } from "@/components/PlayerBar";
import { NavigationBar } from "@/components/ScreenSlider/NavigationBar";

import { stylesheet } from "./ScreenSlider.style";
import { ScreenSlide } from "./types";

interface IProps {
  screens: ScreenSlide[];
}

const screenWidth = UnistylesRuntime.screen.width;
const bottomInset = UnistylesRuntime.insets.bottom;

export const ScreenSlider: FC<IProps> = ({ screens }) => {
  const { styles } = useStyles(stylesheet);

  const activeSlide = useSharedValue(0);
  const sliderRef = useRef<Animated.ScrollView | null>(null);
  const sliderPositionX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    sliderPositionX.value = event.contentOffset.x;
    activeSlide.value = Math.round(sliderPositionX.value / screenWidth);
  });

  const playerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          sliderPositionX.value,
          [0, screenWidth],
          [PlayerBarHeight + bottomInset, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const changeSlide = (direction: number) => {
    sliderRef.current?.scrollTo({
      x: (activeSlide.value + direction) * screenWidth,
    });
  };

  return (
    <View style={styles.root}>
      <NavigationBar
        screens={screens}
        slideWidth={screenWidth}
        sliderPositionX={sliderPositionX}
        goToPrevious={() => changeSlide(-1)}
        goToNext={() => changeSlide(1)}
      />

      <Animated.ScrollView
        ref={sliderRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {screens.map(({ id, Component }) => (
          <View key={id} style={styles.screen}>
            <Component />
          </View>
        ))}
      </Animated.ScrollView>

      <PlayerBar
        style={playerStyle}
        onPress={() => sliderRef.current?.scrollTo({ x: 0, animated: true })}
      />
    </View>
  );
};
