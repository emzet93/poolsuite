import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Card } from "@/components/Card";
import { Text } from "@/components/Text";

export default function HomeScreen() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Card
        containerStyle={styles.cameraCard}
        style={styles.card}
        shadowSize="big"
      >
        <Text size="l" weight="bold">
          Poolsuite
        </Text>
      </Card>

      <Card
        containerStyle={styles.playerCard}
        style={styles.card}
        shadowSize="big"
      >
        <Text size="l" weight="bold">
          Poolsuite
        </Text>
      </Card>
    </View>
  );
}

const stylesheet = createStyleSheet((theme, runtime) => ({
  container: {
    padding: theme.spacing.xs,
    paddingTop: runtime.insets.top + theme.spacing.xs,
    paddingBottom: runtime.insets.bottom + theme.spacing.xs,
    flex: 1,
    backgroundColor: theme.colors.secondary,
    gap: theme.spacing.l,
  },
  cameraCard: {
    flex: 1,
  },
  playerCard: {
    flex: 1,
  },
  card: {
    flex: 1,
    padding: theme.spacing.xs,
  },
}));
