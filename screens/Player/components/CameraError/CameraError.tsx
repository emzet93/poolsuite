import React, { FC } from "react";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { Text } from "@/components/Text";

import { stylesheet } from "./CameraError.style";

interface IProps {
  message: string;
}

export const CameraError: FC<IProps> = React.memo(({ message }) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text weight="bold">CAMERA ERROR</Text>
      </View>
      <Text weight="bold" align="center" color="secondary">
        {message}
      </Text>
    </View>
  );
});
