import Fontisto from "@expo/vector-icons/Fontisto";
import React, { FC } from "react";
import { Pressable, StyleProp, View } from "react-native";
import Animated from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import { Noise } from "@/components/Noise";
import { SlidingText } from "@/components/SlidingText";
import { Text } from "@/components/Text";
import {
  selectActiveTrack,
  selectIsPlaying,
  togglePlay,
  usePlayerStore,
} from "@/store/player";

import { PlayIconSize, stylesheet } from "./PlayerBar.style";

interface IProps {
  onPress: () => void;
  style?: StyleProp<any>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const PlayerBar: FC<IProps> = ({ onPress, style }) => {
  const { styles, theme } = useStyles(stylesheet);

  const currentTrack = usePlayerStore(selectActiveTrack);
  const isPlaying = usePlayerStore(selectIsPlaying);

  return (
    <AnimatedPressable style={[styles.container, style]} onPress={onPress}>
      <View style={styles.player}>
        <View style={styles.trackInfo}>
          <SlidingText
            key={currentTrack?.title}
            weight="bold"
            style={styles.text}
          >
            {currentTrack?.title || "-"}
          </SlidingText>
          <Text numberOfLines={1} style={styles.text}>
            {currentTrack?.artist || "-"}
          </Text>
        </View>

        <Pressable onPress={togglePlay} style={styles.playButton}>
          <Fontisto
            name={isPlaying ? "pause" : "play"}
            size={PlayIconSize}
            color={theme.colors.primary}
          />
        </Pressable>
      </View>
      <Noise style={styles.bottomSafeArea} density={0.18} frequency={0.5} />
    </AnimatedPressable>
  );
};
