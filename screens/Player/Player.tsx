import React, { FC } from "react";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { Card } from "@/components/Card";
import { Text } from "@/components/Text";

import { stylesheet } from "./Player.style";

export const Player: FC = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Card
        containerStyle={styles.cameraCard}
        style={styles.card}
        shadowSize="big"
      >
        <Text size="l" weight="bold">
          Poolsuite
        </Text>
      </Card>

      <Card
        containerStyle={styles.playerCard}
        style={styles.card}
        shadowSize="big"
      >
        <Text size="l" weight="bold">
          Poolsuite
        </Text>
      </Card>
    </View>
  );
};
