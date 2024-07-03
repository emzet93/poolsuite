import React, { FC } from "react";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { Text } from "@/components/Text";

import { stylesheet } from "./About.style";

export const About: FC = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text size="l" weight="bold">
        About
      </Text>
    </View>
  );
};
