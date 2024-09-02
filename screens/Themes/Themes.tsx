import React, { FC } from "react";
import { ScrollView, View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { BackgroundLines } from "@/components/Lines";
import { appThemesList } from "@/theme";

import { ThemeCard } from "./ThemeCard";
import { stylesheet } from "./Themes.style";

export const Themes: FC = () => {
  const { styles, theme: currentTheme } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <BackgroundLines />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {appThemesList.map((theme) => (
          <ThemeCard
            key={theme.name}
            theme={theme}
            screenPadding={theme.spacing.xs}
            isSelected={theme.name === currentTheme.name}
          />
        ))}
      </ScrollView>
    </View>
  );
};
