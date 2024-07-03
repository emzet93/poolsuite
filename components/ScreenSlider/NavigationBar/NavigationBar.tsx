import Fontisto from "@expo/vector-icons/Fontisto";
import React, { FC } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import { ScreenSlide } from "../types";
import { Text } from "@/components/Text";

import {
  ArrowOffset,
  ArrowSize,
  NavigationBarHeight,
  stylesheet,
} from "./NavigationBar.style";

interface IProps {
  screens: ScreenSlide[];
  slideWidth: number;
  sliderPositionX: SharedValue<number>;
  goToPrevious: () => void;
  goToNext: () => void;
}

const screenWidth = UnistylesRuntime.screen.width;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const NavigationBar: FC<IProps> = ({
  screens,
  slideWidth,
  sliderPositionX,
  goToPrevious,
  goToNext,
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

  const arrowLeftStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          sliderPositionX.value,
          [0, screenWidth],
          [-ArrowOffset, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const arrowRightStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          sliderPositionX.value,
          [
            screenWidth * (screens.length - 2),
            screenWidth * (screens.length - 1),
          ],
          [0, ArrowOffset],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <AnimatedPressable
          style={[styles.navigationArrow, arrowLeftStyle]}
          onPress={goToPrevious}
        >
          <Fontisto
            name="arrow-left-l"
            size={ArrowSize}
            color={theme.colors.secondary}
          />
        </AnimatedPressable>

        <View style={styles.namesContainer}>
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

        <AnimatedPressable
          style={[styles.navigationArrow, arrowRightStyle]}
          onPress={goToNext}
        >
          <Fontisto
            name="arrow-right-l"
            size={ArrowSize}
            color={theme.colors.secondary}
          />
        </AnimatedPressable>
      </View>
      <View style={styles.progressBarWrapper}>
        <Animated.View style={[styles.progressBar, progressBarStyle]} />
      </View>
    </View>
  );
};
