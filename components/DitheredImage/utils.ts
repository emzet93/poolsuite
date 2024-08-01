import { Skia } from "@shopify/react-native-skia";

import { hexToRgbArrayWorklet } from "@/components/ImageFilters/utils";

export const ditheringShader = Skia.RuntimeEffect.Make(`
uniform shader image;
uniform half4 primary;
uniform half4 secondary;

float bayer(float2 p) {
  int x = int(mod(p.x, 4.0));
  int y = int(mod(p.y, 4.0));

  if (x == 0 && y == 0) return 0.0 / 16.0;
  if (x == 1 && y == 0) return 8.0 / 16.0;
  if (x == 2 && y == 0) return 8.0 / 16.0;
  if (x == 3 && y == 0) return 10.0 / 16.0;

  if (x == 0 && y == 1) return 12.0 / 16.0;
  if (x == 1 && y == 1) return 4.0 / 16.0;
  if (x == 2 && y == 1) return 14.0 / 16.0;
  if (x == 3 && y == 1) return 6.0 / 16.0;

  if (x == 0 && y == 2) return 3.0 / 16.0;
  if (x == 1 && y == 2) return 11.0 / 16.0;
  if (x == 2 && y == 2) return 6.0 / 16.0;
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

  float threshold = bayer(xy) + 0.1;
  
  if (grayscale > threshold) {
    return secondary;
  } else {
    return primary;
  }
}
`)!;

export const getDitheredImagePaint = (primary: string, secondary: string) => {
  "worklet";
  const paint = Skia.Paint();
  const builder = Skia.RuntimeShaderBuilder(ditheringShader);
  builder.setUniform("primary", hexToRgbArrayWorklet(primary));
  builder.setUniform("secondary", hexToRgbArrayWorklet(secondary));
  const imageFilter = Skia.ImageFilter.MakeRuntimeShader(builder, null, null);
  paint.setImageFilter(imageFilter);
  return paint;
};
