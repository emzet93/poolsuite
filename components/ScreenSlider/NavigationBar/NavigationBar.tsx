import React, { FC } from "react";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import { ScreenSlide } from "../types";
import { Text } from "@/components/Text";

import { NavigationBarHeight, stylesheet } from "./NavigationBar.style";

interface IProps {
  screens: ScreenSlide[];
  slideWidth: number;
  sliderPositionX: SharedValue<number>;
}

const screenWidth = UnistylesRuntime.screen.width;

export const NavigationBar: FC<IProps> = ({
  screens,
  slideWidth,
  sliderPositionX,
}) => {
  const { styles, theme } = useStyles(stylesheet);

  const namesStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: interpolate(
            sliderPositionX.value,
            [0, slideWidth * (screens.length - 1)],
            [0, -NavigationBarHeight * (screens.length - 1)],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }),
    [screens.length, slideWidth],
  );

  const progressBarStyle = useAnimatedStyle(() => {
    const padding = theme.spacing.xs;
    const progressBarWidth = (screenWidth - padding * 2) / 3;

    return {
      left: padding,
      width: progressBarWidth,
      transform: [
        {
          translateX: interpolate(
            sliderPositionX.value,
            [0, screenWidth * (screens.length - 1)],
            [0, progressBarWidth * (screens.length - 1)],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, [theme, screens.length]);

  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <Animated.View style={namesStyle}>
          {screens.map((screen, index) => (
            <View key={screen.id} style={styles.name}>
              <Text color="secondary">{`0${index + 1}`}</Text>
              <Text color="secondary" weight="bold">
                {screen.name}
              </Text>
            </View>
          ))}
        </Animated.View>
      </View>
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, progressBarStyle]} />
      </View>
    </View>
  );
};
