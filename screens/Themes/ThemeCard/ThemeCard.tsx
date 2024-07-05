import Fontisto from "@expo/vector-icons/Fontisto";
import { Canvas, Image, useImage } from "@shopify/react-native-skia";
import React, { FC } from "react";
import { View } from "react-native";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import { Card } from "@/components/Card";
import { RetroFilter } from "@/components/RetroFilter";
import { Text } from "@/components/Text";
import { Theme } from "@/theme/types";

import { stylesheet, ThemeCardHeight } from "./ThemeCard.style";

interface IProps {
  theme: Theme;
  screenPadding: number;
  isSelected: boolean;
}

export const ThemeCard: FC<IProps> = ({ theme, screenPadding, isSelected }) => {
  const { styles } = useStyles(stylesheet);

  const image = useImage(theme.imageSource);

  const cardWidth = UnistylesRuntime.screen.width - 2 * screenPadding;
  const cardHeight = ThemeCardHeight;

  return (
    <Card
      containerStyle={styles.themeCard}
      style={styles.themeCardContent}
      shadowSize="big"
      onPress={() => {
        UnistylesRuntime.setTheme(theme.name);
      }}
    >
      <Canvas style={styles.backgroundImage}>
        <Image
          image={image}
          fit="cover"
          x={0}
          y={0}
          width={cardWidth}
          height={cardHeight}
        />
        <RetroFilter width={cardWidth} height={cardHeight} />
      </Canvas>
      <View style={[styles.themeName, isSelected && styles.themeName_selected]}>
        {isSelected && (
          <Fontisto
            name="check"
            size={theme.spacing.xs}
            color={theme.colors.secondary}
          />
        )}
        <Text weight="bold" color={isSelected ? "secondary" : "primary"}>
          {theme.name}
        </Text>
      </View>
    </Card>
  );
};
