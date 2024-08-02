import React, { FC, useState } from "react";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { Card } from "@/components/Card";
import { Noise } from "@/components/Noise";
import { PlayerCamera } from "@/screens/Player/components/PlayerCamera";
import { PlayerCard } from "@/screens/Player/components/PlayerCard";
import { PlayerVideo } from "@/screens/Player/components/PlayerVideo";

import { stylesheet } from "./Player.style";

export const Player: FC = () => {
  const { styles } = useStyles(stylesheet);

  const [showCamera, setShowCamera] = useState(false);

  return (
    <View style={styles.container}>
      <Noise style={styles.background} density={0.18} />
      <Card
        containerStyle={styles.cameraCard}
        style={styles.cameraCardContent}
        shadowSize="big"
      >
        {showCamera ? (
          <PlayerCamera onExit={() => setShowCamera(false)} />
        ) : (
          <PlayerVideo openCamera={() => setShowCamera(true)} />
        )}
      </Card>
      <PlayerCard />
    </View>
  );
};
