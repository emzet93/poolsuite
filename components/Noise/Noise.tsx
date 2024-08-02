import {
  Canvas,
  Fill,
  FractalNoise,
  Shader,
  Skia,
} from "@shopify/react-native-skia";
import { FC, useEffect } from "react";
import { StyleProp } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { useThemeUniforms } from "@/components/ImageFilters";

interface IProps {
  style?: StyleProp<any>;
}

export const themeShader = Skia.RuntimeEffect.Make(`
uniform shader image;
uniform half4 primary;
uniform half4 secondary;

half4 main(float2 xy) {
  half4 color = image.eval(xy);
  float grayscale = (color.r + color.g + color.b) / 3.0;
  
  if (grayscale > 0.25) {
    return secondary;
  } else {
    return primary;
  }
}
`)!;

export const Noise: FC<IProps> = ({ style }) => {
  const uniforms = useThemeUniforms();

  const seed = useSharedValue(1);

  useEffect(() => {
    setInterval(() => {
      seed.value = Math.round(Math.random() * 10);
    }, 50);
  }, [seed]);

  return (
    <Canvas style={[{ flex: 1 }, style]}>
      <Fill>
        <FractalNoise freqX={0.18} freqY={0.18} octaves={3} seed={seed} />
        <Shader source={themeShader} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
};
