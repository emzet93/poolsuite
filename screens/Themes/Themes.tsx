import React, { FC } from "react";
import { ScrollView } from "react-native";
import { useStyles } from "react-native-unistyles";

import { appThemesList } from "@/theme";

import { ThemeCard } from "./ThemeCard";
import { stylesheet } from "./Themes.style";

export const Themes: FC = () => {
  const { styles, theme: currentTheme } = useStyles(stylesheet);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
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
  );
};
