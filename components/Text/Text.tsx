import React, { FC } from "react";
import { TextProps as RNTextProps } from "react-native";
import { useStyles } from "react-native-unistyles";

import { Theme } from "@/theme/types";

import { stylesheet, textSize, fontWeight } from "./Text.style";

export interface TextProps
  extends Omit<
    RNTextProps,
    "onPress" | "onPressIn" | "onPressOut" | "onLongPress"
  > {
  color?: keyof Theme["colors"];
  size?: keyof typeof textSize;
  weight?: keyof typeof fontWeight;
  align?: "auto" | "left" | "center" | "right";
}

const RawText = (props: RNTextProps) => React.createElement("RCTText", props);

export const Text: FC<TextProps> = ({
  style,
  color = "primary",
  size = "m",
  weight = "light",
  align = "auto",
  ...props
}) => {
  const { styles } = useStyles(stylesheet);

  return (
    <RawText
      {...props}
      style={[styles.text(color, size, weight), style, { textAlign: align }]}
    />
  );
};
