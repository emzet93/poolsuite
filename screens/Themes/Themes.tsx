import React, { FC } from "react";
import { ScrollView, View } from "react-native";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import { appThemesList } from "@/theme";

import { stylesheet } from "./Themes.style";

export const Themes: FC = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
    >
      {appThemesList.map((theme) => (
        <Card
          key={theme.name}
          containerStyle={styles.themeCard}
          style={styles.themeCardContent}
          shadowSize="big"
          onPress={() => {
            UnistylesRuntime.setTheme(theme.name);
          }}
        >
          <View style={styles.themeName}>
            <Text weight="bold">{theme.name}</Text>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};
