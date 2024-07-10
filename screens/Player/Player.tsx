import React, { FC } from "react";
import { Pressable, View } from "react-native";
import { useProgress } from "react-native-track-player";
import { useStyles } from "react-native-unistyles";

import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import { PlayerVideo } from "@/screens/Player/PlayerVideo";
import { useLibraryStore } from "@/store/library";
import {
  playChannel,
  playNext,
  playPrevious,
  selectActiveTrack,
  togglePlay,
  usePlayerStore,
} from "@/store/player";

import { stylesheet } from "./Player.style";

export const Player: FC = () => {
  const { styles } = useStyles(stylesheet);

  const channels = useLibraryStore((state) => state.channels);
  const queue = usePlayerStore((state) => state.queue);
  const currentTrack = usePlayerStore(selectActiveTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const isBuffering = usePlayerStore((state) => state.isBuffering);

  const progress = useProgress();

  const playNextChannel = () => {
    const activeChannelIndex = channels.findIndex(
      (c) => c.id === queue?.channel.id,
    );
    const nextChannel = channels[activeChannelIndex + 1];

    playChannel(nextChannel || channels[0], true);
  };

  return (
    <View style={styles.container}>
      <Card
        containerStyle={styles.cameraCard}
        style={styles.cameraCardContent}
        shadowSize="big"
      >
        <PlayerVideo />
      </Card>

      <Card
        containerStyle={styles.playerCard}
        style={styles.playerCardContent}
        shadowSize="big"
      >
        {queue && (
          <>
            <View style={styles.playerInfo}>
              <Pressable onPress={playNextChannel}>
                <Text size="l" weight="bold" align="center">
                  {queue?.channel?.name}
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

            {progress?.duration ? (
              <Text>
                {`${Math.round(progress.position)} / ${Math.round(progress.duration)}`}
              </Text>
            ) : null}

            {isBuffering && <Text>Loading...</Text>}
          </>
        )}
      </Card>
    </View>
  );
};
