import React, { FC } from "react";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { Noise } from "@/components/Noise";
import { Text } from "@/components/Text";

import { stylesheet } from "./About.style";

export const About: FC = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Noise style={styles.background} density={0.05} inverted />
      <Text size="l" weight="bold">
        About
      </Text>
    </View>
  );
};
