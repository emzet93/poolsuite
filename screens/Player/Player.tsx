import React, { FC } from "react";
import { Pressable, View } from "react-native";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import { Waveform } from "@/components/Waveform";
import { PlayerCamera } from "@/screens/Player/PlayerCamera";
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

import { stylesheet } from "./Player.style";

export const Player: FC = () => {
  const { styles, theme } = useStyles(stylesheet);

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

  const videoWidth = UnistylesRuntime.screen.width - theme.spacing.xs * 2;
  const videoHeight = videoWidth;

  return (
    <View style={styles.container}>
      <Card
        containerStyle={styles.cameraCard}
        style={styles.cameraCardContent}
        shadowSize="big"
      >
        <PlayerCamera width={videoWidth} height={videoHeight} />
      </Card>

      <Card
        containerStyle={styles.playerCard}
        style={styles.playerCardContent}
        shadowSize="big"
      >
        {currentTrack && (
          <Waveform
            waveformUrl={currentTrack.waveformUrl}
            progress={progress}
            duration={currentTrack.durationMs / 1000}
          />
        )}

        {queue && (
          <>
            <View style={styles.playerInfo}>
              <Pressable onPress={playNextChannel}>
                <Text size="l" weight="bold" align="center">
                  {queue.channel?.name}
                </Text>
              </Pressable>
              <Text align="center">{currentTrack?.title}</Text>
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
      </Card>
    </View>
  );
};
