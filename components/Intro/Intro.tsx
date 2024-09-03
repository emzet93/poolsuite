import React, { FC, useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, { FadeIn, runOnJS } from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import { Lines } from "@/components/Lines";
import { Text } from "@/components/Text";

import { stylesheet } from "./Intro.style";

interface Props {
  close: () => void;
}

export const Intro: FC<Props> = ({ close }) => {
  const { styles } = useStyles(stylesheet);

  const delayedClose = () => {
    setTimeout(close, 1000);
  };

  return (
    <Pressable onPress={close} style={styles.container}>
      <Lines count={20} />
      <View style={styles.content}>
        <Animated.View entering={FadeIn.duration(1500)}>
          <Text weight="bold" size="xl">
            Poolsuite
          </Text>
        </Animated.View>
        <Animated.View
          entering={FadeIn.delay(1000)
            .duration(1500)
            .withCallback((finished) => {
              if (finished) {
                runOnJS(delayedClose)();
              }
            })}
        >
          <Text>Where the sun never sets</Text>
        </Animated.View>
      </View>
      <Lines count={20} />
    </Pressable>
  );
};
