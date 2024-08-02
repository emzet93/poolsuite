import {
  Canvas,
  Fill,
  FractalNoise,
  Shader,
  Skia,
} from "@shopify/react-native-skia";
import React, { FC, useEffect } from "react";
import { StyleProp } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { useThemeUniforms } from "@/components/ImageFilters";

interface IProps {
  density?: number;
  frequency?: number;
  animated?: boolean;
  inverted?: boolean;
  style?: StyleProp<any>;
}

export const themeShader = Skia.RuntimeEffect.Make(`
uniform shader image;
uniform half4 primary;
uniform half4 secondary;
uniform float density;

half4 main(float2 xy) {
  half4 color = image.eval(xy);
  float grayscale = (color.r + color.g + color.b) / 3.0;
  
  if (grayscale > density) {
    return secondary;
  } else {
    return primary;
  }
}
`)!;

export const Noise: FC<IProps> = React.memo(
  ({
    density = 0.25,
    frequency = 0.18,
    style,
    inverted = false,
    animated = false,
  }) => {
    const { primary, secondary } = useThemeUniforms();

    const colors = inverted
      ? { primary: secondary, secondary: primary }
      : { primary, secondary };

    const seed = useSharedValue(1);

    useEffect(() => {
      if (animated) {
        const intervalId = setInterval(() => {
          seed.value = Math.round(Math.random() * 10);
        }, 50);

        return () => {
          clearInterval(intervalId);
        };
      }
    }, [seed, animated]);

    return (
      <Canvas style={[{ flex: 1 }, style]}>
        <Fill>
          <FractalNoise
            freqX={frequency}
            freqY={frequency}
            octaves={3}
            seed={seed}
          />
          <Shader source={themeShader} uniforms={{ ...colors, density }} />
        </Fill>
      </Canvas>
    );
  },
);
