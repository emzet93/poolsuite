import { Canvas, Fill, Shader, Skia } from "@shopify/react-native-skia";
import React, { FC, useEffect, useState } from "react";
import { UnistylesRuntime } from "react-native-unistyles";

import { ThemeFilter } from "@/components/ImageFilters";

const { width, height } = UnistylesRuntime.screen;

const frames = [
  { x: 8, y: 4 },
  { x: 2, y: 4 },
  { x: 2, y: 2 },
  { x: 1, y: 2 },
  { x: 1, y: 1 },
];

const source = Skia.RuntimeEffect.Make(`
uniform float xDensity;
uniform float yDensity;

vec4 main(vec2 pos) {
  if (int(mod(pos.x, xDensity + 1)) == 0) {
    return vec4(0, 0, 0, 1);
  }
  if (int(mod(pos.y, yDensity + 1)) == 0) {
    return vec4(0, 0, 0, 1);
  }
  
  return vec4(0, 0, 0, 0);
}`)!;

export const ModalBackdrop: FC = React.memo(() => {
  const [density, setDensity] = useState(frames[0]);

  useEffect(() => {
    let index = 0;

    const id = setInterval(() => {
      if (index === frames.length - 1) {
        clearInterval(id);
        return;
      }

      index += 1;

      setDensity(frames[index]);
    }, 75);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Canvas style={{ width, height }}>
      <Fill>
        <Shader
          source={source}
          uniforms={{ xDensity: density.x, yDensity: density.y }}
        />
      </Fill>
      <ThemeFilter width={width} height={height} />
    </Canvas>
  );
});
