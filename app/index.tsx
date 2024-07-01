import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Text } from "@/components/Text";
export default function HomeScreen() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text color="secondary" size="l" weight="bold">
        Poolsuite
      </Text>
      <Text color="secondary" size="l">
        Poolsuite
      </Text>
      <View style={{ height: 14, width: 10, backgroundColor: "pink" }} />
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
  row: {
    flexDirection: "row",
  },
}));
