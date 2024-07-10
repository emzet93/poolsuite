import React, { FC } from "react";
import { TextProps as RNTextProps, Text as RNText } from "react-native";
import { useStyles } from "react-native-unistyles";

import { Theme } from "@/theme/types";

import { stylesheet, textSize, fontWeight } from "./Text.style";

interface TextProps extends RNTextProps {
  color?: keyof Theme["colors"];
  size?: keyof typeof textSize;
  weight?: keyof typeof fontWeight;
  align?: "auto" | "left" | "center" | "right";
}

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
    <RNText
      {...props}
      style={[styles.text(color, size, weight), style, { textAlign: align }]}
    />
  );
};
