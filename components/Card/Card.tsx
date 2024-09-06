import React, { FC, ReactNode } from "react";
import { Pressable, PressableProps, StyleProp, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import { stylesheet, shadowSizeConfig } from "./Card.style";

interface Props
  extends Pick<
    PressableProps,
    "onPress" | "onPressIn" | "onPressOut" | "disabled"
  > {
  inverted?: boolean;
  containerStyle?: StyleProp<any>;
  style?: StyleProp<any>;
  children?: ReactNode;
  shadowSize?: "small" | "big";
}

export const Card: FC<Props> = ({
  inverted = false,
  style,
  children,
  shadowSize = "small",
  containerStyle,
  onPress,
  disabled,
  ...props
}) => {
  const { styles } = useStyles(stylesheet);

  const isPressed = useSharedValue(false);

  const pressedStyle = useAnimatedStyle(() => {
    const translation = isPressed.value ? shadowSizeConfig[shadowSize] : 0;

    return {
      transform: [{ translateX: translation }, { translateY: translation }],
    };
  });

  return (
    <Pressable
      disabled={disabled || !onPress}
      onPressIn={() => (isPressed.value = true)}
      onPressOut={() => (isPressed.value = false)}
      onPress={(event) => {
        onPress?.(event);
        isPressed.value = false;
      }}
      {...props}
      style={[styles.container(shadowSize), containerStyle]}
    >
      <View
        style={[
          styles.shadow,
          styles.placeholderShadow(shadowSize),
          inverted && styles.shadow_inverted,
        ]}
      />
      <View
        style={[
          styles.shadow,
          styles.offsetShadow(shadowSize),
          inverted && styles.shadow_inverted,
        ]}
      />
      <Animated.View
        style={[
          styles.card,
          inverted && styles.card_inverted,
          style,
          pressedStyle,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};
