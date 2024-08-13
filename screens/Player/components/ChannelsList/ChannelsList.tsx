import Fontisto from "@expo/vector-icons/Fontisto";
import React, { FC } from "react";
import { Pressable, View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { Noise } from "@/components/Noise";
import { Text } from "@/components/Text";
import { Channel } from "@/store/library/types";

import { stylesheet } from "./ChannelsList.style";

export interface Props {
  channels: Channel[];
  activeChannelId: string | undefined;
  onChannelPress: (channel: Channel) => void;
  onClose: () => void;
}

export const ChannelsList: FC<Props> = React.memo(
  ({ channels, activeChannelId, onChannelPress, onClose }) => {
    const { styles, theme } = useStyles(stylesheet);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text size="l" color="secondary">
            Change the channel
          </Text>
          <Pressable onPress={onClose} style={styles.closeIcon}>
            <Fontisto size={10} name="close-a" color={theme.colors.secondary} />
          </Pressable>
        </View>
        <View style={styles.list}>
          {channels.map((channel) => {
            const isActive = channel.id === activeChannelId;

            return (
              <Pressable
                key={channel.id}
                onPress={() => {
                  onChannelPress(channel);
                  onClose();
                }}
                style={[styles.item, isActive && styles.item_active]}
              >
                <Text
                  weight="bold"
                  align="center"
                  color={isActive ? "primary" : "secondary"}
                >
                  {channel.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Noise inverted style={styles.noise} density={0.18} frequency={0.5} />
      </View>
    );
  },
);
