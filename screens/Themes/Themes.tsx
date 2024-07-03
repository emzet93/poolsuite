import React, { FC } from "react";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { Text } from "@/components/Text";

import { stylesheet } from "./Themes.style";

export const Themes: FC = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text size="l" weight="bold">
        Themes
      </Text>
    </View>
  );
};
