import { LayoutChangeEvent } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export const useDimensions = () => {
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const onLayout = (e: LayoutChangeEvent) => {
    width.value = e.nativeEvent.layout.width;
    height.value = e.nativeEvent.layout.height;
  };

  return {
    width,
    height,
    onLayout,
  };
};
