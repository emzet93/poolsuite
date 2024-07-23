import {
  Canvas,
  Skia,
  ImageShader,
  Shader,
  Fill,
  SkImage,
} from "@shopify/react-native-skia";
import { FC } from "react";
import { SharedValue } from "react-native-reanimated";

import { ThemeFilter } from "@/components/Filters";

interface IProps {
  width: number;
  height: number;
  image: SkImage | null | SharedValue<SkImage | null>; // Adjust the type if needed for your SkImage
}

const ditheringShader = Skia.RuntimeEffect.Make(`
uniform shader image;
uniform float2 resolution;

float bayer(float2 p) {
  int x = int(mod(p.x, 4.0));
  int y = int(mod(p.y, 4.0));

  if (x == 0 && y == 0) return 0.0 / 16.0;
  if (x == 1 && y == 0) return 8.0 / 16.0;
  if (x == 2 && y == 0) return 2.0 / 16.0;
  if (x == 3 && y == 0) return 10.0 / 16.0;

  if (x == 0 && y == 1) return 12.0 / 16.0;
  if (x == 1 && y == 1) return 4.0 / 16.0;
  if (x == 2 && y == 1) return 14.0 / 16.0;
  if (x == 3 && y == 1) return 6.0 / 16.0;

  if (x == 0 && y == 2) return 3.0 / 16.0;
  if (x == 1 && y == 2) return 11.0 / 16.0;
  if (x == 2 && y == 2) return 1.0 / 16.0;
  if (x == 3 && y == 2) return 9.0 / 16.0;

  if (x == 0 && y == 3) return 15.0 / 16.0;
  if (x == 1 && y == 3) return 7.0 / 16.0;
  if (x == 2 && y == 3) return 13.0 / 16.0;
  if (x == 3 && y == 3) return 5.0 / 16.0;

  return 0.0;
}

half4 main(float2 xy) {
  half4 color = image.eval(xy);
  float grayscale = (color.r + color.g + color.b) / 3.0;

  float threshold = bayer(xy);

  float binaryColor = grayscale > threshold ? 1.0 : 0.0;
  return half4(binaryColor, binaryColor, binaryColor, color.a);
}
`)!;
export const DitheredImage: FC<IProps> = ({ width, height, image }) => {
  if (!ditheringShader || !image) {
    return null;
  }

  return (
    <Canvas style={{ width, height }}>
      <Fill>
        <Shader
          source={ditheringShader}
          uniforms={{
            resolution: [width, height],
          }}
        >
          <ImageShader
            image={image}
            fit="cover"
            rect={{ x: 0, y: 0, width, height }}
          />
        </Shader>
      </Fill>
      <ThemeFilter width={width} height={height} />
    </Canvas>
  );
};
