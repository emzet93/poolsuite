import React, { FC } from "react";
import { StyleProp, View } from "react-native";
import { useStyles } from "react-native-unistyles";

interface IProps {
  count?: number;
  style?: StyleProp<any>;
}

export const Lines: FC<IProps> = React.memo(({ count = 4, style }) => {
  const { theme } = useStyles();

  return (
    <View style={[{ width: "100%", gap: theme.spacing.xxs / 2 }, style]}>
      {new Array(count).fill(0).map((_, index) => (
        <View
          key={index}
          style={{
            width: "100%",
            height: 1,
            backgroundColor: theme.colors.primary,
          }}
        />
      ))}
    </View>
  );
});
