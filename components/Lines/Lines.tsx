import React, { FC } from "react";
import { StyleProp, StyleSheet, View } from "react-native";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

export const Lines: FC<{
  count?: number;
  style?: StyleProp<any>;
}> = React.memo(({ count = 4, style }) => {
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

export const BackgroundLines: FC<{
  style?: StyleProp<any>;
}> = React.memo(({ style }) => {
  const { theme } = useStyles();
  const gap = theme.spacing.xxs;
  const stroke = 1;
  const count = Math.ceil(UnistylesRuntime.screen.width / (stroke + gap));

  return (
    <View
      style={[
        { ...StyleSheet.absoluteFillObject, gap, flexDirection: "row" },
        style,
      ]}
    >
      {new Array(count).fill(0).map((_, index) => (
        <View
          key={index}
          style={{
            height: "100%",
            width: stroke,
            backgroundColor: theme.colors.primary,
          }}
        />
      ))}
    </View>
  );
});
