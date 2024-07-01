import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Text } from "@/components/Text";
export default function HomeScreen() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text color="secondary" size="xl">
        Poolsuite
      </Text>
    </View>
  );
}

const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    paddingTop: runtime.insets.top,
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.primary,
  },
}));
