import React, { FC, ReactNode, useState } from "react";
import { Modal as RNModal, Pressable, View } from "react-native";
import Animated, {
  runOnJS,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import { Card } from "@/components/Card";
import { ModalBackdrop } from "@/components/Modal/ModalBackdrop";

import { stylesheet } from "./Modal.style";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ isOpen, children, onClose }) => {
  const { styles } = useStyles(stylesheet);

  const [isModalVisible, setIsModalVisible] = useState(isOpen);

  if (isOpen && !isModalVisible) {
    setIsModalVisible(true);
  }

  return (
    <RNModal
      visible={isModalVisible}
      animationType="none"
      transparent
      onRequestClose={onClose}
    >
      {isOpen && (
        <>
          <View style={styles.container}>
            <AnimatedPressable
              style={styles.backdropContainer}
              onPress={onClose}
            >
              <ModalBackdrop />
            </AnimatedPressable>

            <Animated.View
              entering={SlideInDown.duration(500)}
              exiting={SlideOutDown.withCallback(() => {
                runOnJS(setIsModalVisible)(false);
              })}
            >
              <Card shadowSize="big">{children}</Card>
            </Animated.View>
          </View>
        </>
      )}
    </RNModal>
  );
};
