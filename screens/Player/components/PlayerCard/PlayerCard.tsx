import Fontisto from "@expo/vector-icons/Fontisto";
import React, { FC } from "react";
import { Pressable, View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { Card } from "@/components/Card";
import { Lines } from "@/components/Lines";
import { Noise } from "@/components/Noise";
import { Text } from "@/components/Text";
import { Waveform } from "@/components/Waveform";
import { selectChannels, useLibraryStore } from "@/store/library";
import {
  playChannel,
  playNext,
  playPrevious,
  selectActiveTrack,
  selectIsPlaying,
  selectProgress,
  selectQueue,
  togglePlay,
  usePlayerStore,
} from "@/store/player";
import { formatDuration } from "@/utils/dateTime";

import { ControlArrowSize, stylesheet } from "./PlayerCard.style";

interface IProps {}

export const PlayerCard: FC<IProps> = () => {
  const { styles, theme } = useStyles(stylesheet);
  const channels = useLibraryStore(selectChannels);
  const queue = usePlayerStore(selectQueue);
  const currentTrack = usePlayerStore(selectActiveTrack);
  const isPlaying = usePlayerStore(selectIsPlaying);
  const progress = usePlayerStore(selectProgress);

  const playPreviousChannel = () => {
    const activeChannelIndex = channels.findIndex(
      (c) => c.id === queue?.channel.id,
    );
    const previousChannel = channels[activeChannelIndex - 1];

    playChannel(previousChannel || channels[channels.length - 1]);
  };

  const playNextChannel = () => {
    const activeChannelIndex = channels.findIndex(
      (c) => c.id === queue?.channel.id,
    );
    const nextChannel = channels[activeChannelIndex + 1];

    playChannel(nextChannel || channels[0]);
  };

  return (
    <Card shadowSize="big">
      {queue && (
        <View style={styles.channelInfo}>
          <Pressable onPress={playPreviousChannel} style={styles.channelAction}>
            <Fontisto
              name="caret-left"
              size={ControlArrowSize}
              color={theme.colors.secondary}
            />
          </Pressable>

          <View style={styles.channelCardContainer}>
            <Card onPress={() => {}} inverted style={styles.channelCard}>
              <Text size="m" weight="bold" align="center" color="secondary">
                <Text size="l" align="center" color="secondary">
                  {"Channel: "}
                </Text>
                {queue.channel?.name}
              </Text>
            </Card>
          </View>

          <Pressable onPress={playNextChannel} style={styles.channelAction}>
            <Fontisto
              name="caret-right"
              size={ControlArrowSize}
              color={theme.colors.secondary}
            />
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

      <Lines style={styles.lines} />

      {currentTrack && (
        <View style={styles.content}>
          <View style={styles.playerInfo}>
            <Text size="l">
              {`${formatDuration(progress)}  /  ${formatDuration(currentTrack?.durationMs / 1000)}`}
            </Text>

            <Text align="center" size="m" weight="bold" numberOfLines={1}>
              {currentTrack.title}
            </Text>

            <Text align="center" size="l">
              {currentTrack.artist}
            </Text>
          </View>

          <View style={styles.playerControls}>
            <Card
              containerStyle={styles.controlContainer}
              style={[styles.control, styles.leftControl]}
              onPress={playPrevious}
            >
              <Fontisto
                name="step-backwrad"
                size={ControlArrowSize}
                color={theme.colors.primary}
              />
            </Card>
            <Card
              containerStyle={[
                styles.controlContainer,
                styles.middleControlContainer,
              ]}
              style={[styles.control, styles.middleControl]}
              onPress={togglePlay}
            >
              <Fontisto
                name={isPlaying ? "pause" : "play"}
                size={ControlArrowSize}
                color={theme.colors.primary}
              />
            </Card>
            <Card
              containerStyle={styles.controlContainer}
              style={[styles.control, styles.rightControl]}
              onPress={() => playNext()}
            >
              <Fontisto
                name="step-forward"
                size={ControlArrowSize}
                color={theme.colors.primary}
              />
            </Card>
          </View>
        </View>
      )}

      <Noise style={styles.noise} density={0.18} frequency={0.5} />
    </Card>
  );
};
