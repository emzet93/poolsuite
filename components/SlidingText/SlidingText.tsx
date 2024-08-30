import React, { FC, useRef } from "react";
import { StyleProp, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import { Text, TextProps } from "@/components/Text";

import { stylesheet, DividerWidth } from "./SlidingTest.style";

interface Props extends TextProps {
  containerStyle?: StyleProp<any>;
}

export const SlidingText: FC<Props> = ({
  containerStyle,
  style: textStyle,
  ...textProps
}) => {
  const { styles } = useStyles(stylesheet);

  const translateX = useSharedValue(0);
  const containerWidth = useRef(0);
  const textWidth = useRef(0);

  const slidingTextStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const textCopyStyle = useAnimatedStyle(() => ({
    display: translateX.value === 0 ? "none" : "flex",
  }));

  const handleSliding = () => {
    if (
      containerWidth.current &&
      textWidth.current &&
      textWidth.current - 1 > containerWidth.current
    ) {
      const distance = textWidth.current + DividerWidth;
      const config = {
        // 30 pixels per second
        duration: (distance * 1000) / 30,
        easing: Easing.linear,
      };

      translateX.value = withRepeat(
        withSequence(
          withDelay(1500, withTiming(-distance, config)),
          withDelay(1500, withTiming(0, { duration: 0 })),
        ),
        -1,
      );
    }
  };

  return (
    <View
      style={[containerStyle, styles.container]}
      onLayout={(event) => {
        if (event.nativeEvent.layout.width !== containerWidth.current) {
          translateX.value = 0;
          containerWidth.current = event.nativeEvent.layout.width;
          handleSliding();
        }
      }}
    >
      <Animated.View style={[styles.slidingTextContainer, slidingTextStyle]}>
        <Text
          onLayout={(event) => {
            if (event.nativeEvent.layout.width !== textWidth.current) {
              translateX.value = 0;
              textWidth.current = event.nativeEvent.layout.width;
              handleSliding();
            }
          }}
          style={textStyle}
          {...textProps}
        />
        <Animated.View style={[styles.textCopy, textCopyStyle]}>
          <Text style={textStyle} {...textProps} />
        </Animated.View>
      </Animated.View>
      <Text
        {...textProps}
        style={[textStyle, styles.textPlaceholder]}
        numberOfLines={1}
      />
    </View>
  );
};
