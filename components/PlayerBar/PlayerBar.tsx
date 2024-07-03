import React, { FC } from "react";
import { Pressable, StyleProp, View } from "react-native";
import Animated from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import { Text } from "@/components/Text";

import { stylesheet } from "./PlayerBar.style";

interface IProps {
  onPress: () => void;
  style?: StyleProp<any>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const PlayerBar: FC<IProps> = ({ onPress, style }) => {
  const { styles } = useStyles(stylesheet);

  return (
    <AnimatedPressable style={[styles.container, style]} onPress={onPress}>
      <View style={styles.player}>
        <View style={styles.trackInfo}>
          <Text weight="bold">Song title</Text>
          <Text>Artist Name</Text>
        </View>
      </View>
    </AnimatedPressable>
  );
};
