import React, { FC } from "react";
import { Pressable, StyleProp, View } from "react-native";
import Animated from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import { Waveform } from "@/components/Waveform";
import { selectChannels, useLibraryStore } from "@/store/library";
import {
  playChannel,
  playNext,
  playPrevious,
  selectActiveTrack,
  selectIsBuffering,
  selectIsPlaying,
  selectProgress,
  selectQueue,
  togglePlay,
  usePlayerStore,
} from "@/store/player";

import { stylesheet } from "./PlayerCard.style";

interface IProps {}

export const PlayerCard: FC<IProps> = () => {
  const { styles } = useStyles(stylesheet);
  const channels = useLibraryStore(selectChannels);
  const queue = usePlayerStore(selectQueue);
  const currentTrack = usePlayerStore(selectActiveTrack);
  const isPlaying = usePlayerStore(selectIsPlaying);
  const isBuffering = usePlayerStore(selectIsBuffering);
  const progress = usePlayerStore(selectProgress);

  const playNextChannel = () => {
    const activeChannelIndex = channels.findIndex(
      (c) => c.id === queue?.channel.id,
    );
    const nextChannel = channels[activeChannelIndex + 1];

    playChannel(nextChannel || channels[0], true);
  };

  return (
    <Card
      containerStyle={styles.playerCard}
      style={styles.playerCardContent}
      shadowSize="big"
    >
      {queue && (
        <View style={styles.channelInfo}>
          <Pressable onPress={playNextChannel}>
            <Text size="m" weight="bold" align="center" color="secondary">
              {queue.channel?.name}
            </Text>
          </Pressable>
        </View>
      )}
      {currentTrack && (
        <Waveform
          waveformUrl={currentTrack.waveformUrl}
          progress={progress}
          duration={currentTrack.durationMs / 1000}
        />
      )}

      <View style={styles.content}>
        {queue && (
          <>
            <View style={styles.playerInfo}>
              <Text align="center" size="m">
                {currentTrack?.title}
              </Text>
            </View>

            <View style={styles.playerControls}>
              <Card style={styles.control} onPress={playPrevious}>
                <Text>Prev</Text>
              </Card>
              <Card style={styles.control} onPress={togglePlay}>
                <Text>{isPlaying ? "Pause" : "Play"}</Text>
              </Card>
              <Card style={styles.control} onPress={playNext}>
                <Text>Next</Text>
              </Card>
            </View>

            {currentTrack && (
              <Text>
                {`${Math.round(progress)} / ${Math.round(currentTrack?.durationMs / 1000)}`}
              </Text>
            )}

            {isBuffering && <Text>Loading...</Text>}
          </>
        )}
      </View>
    </Card>
  );
};
