import {
  Canvas,
  Shader,
  Fill,
  SkImage,
  ImageShader,
} from "@shopify/react-native-skia";
import { FC } from "react";
import { SharedValue } from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import { useThemeUniforms } from "../ImageFilters";
import { ditheringShader } from "@/components/DitheredImage/utils";

interface IProps {
  width: number | SharedValue<number>;
  height: number | SharedValue<number>;
  image: SkImage | null | SharedValue<SkImage | null>; // Adjust the type if needed for your SkImage
}

export const DitheredImage: FC<IProps> = ({ width, height, image }) => {
  const uniforms = useThemeUniforms();
  const { theme } = useStyles();

  return (
    <Canvas style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <Fill>
        <Shader source={ditheringShader} uniforms={uniforms}>
          <ImageShader
            image={image}
            fit="cover"
            width={width}
            height={height}
          />
        </Shader>
      </Fill>
    </Canvas>
  );
};
