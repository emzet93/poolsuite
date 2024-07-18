import { Canvas, Image, rect, Skia, SkImage } from "@shopify/react-native-skia";
import { FC } from "react";
import { runOnUI, SharedValue, useSharedValue } from "react-native-reanimated";

interface IProps {
  width: number;
  height: number;
  image: SkImage | null;
}

export const PixelatedImage: FC<IProps> = ({ width, height, image }) => {
  const resultImage = useSharedValue<SkImage | null>(null);

  if (image && !resultImage.value) {
    runOnUI(transformImage)(image, resultImage, width, height);
  }

  return (
    <Canvas style={{ flex: 1 }}>
      <Image
        image={resultImage}
        fit="cover"
        x={0}
        y={0}
        width={width}
        height={height}
      />
    </Canvas>
  );
};

const threshold = 128;

const getCoverRectangles = (
  imageWidth: number,
  imageHeight: number,
  destWidth: number,
  destHeight: number,
) => {
  "worklet";
  const imageRatio = imageWidth / imageHeight;
  const destRatio = destWidth / destHeight;

  let srcX = 0,
    srcY = 0,
    srcWidth = imageWidth,
    srcHeight = imageHeight;

  if (imageRatio > destRatio) {
    // Image is wider than destination, crop the width
    srcWidth = imageHeight * destRatio;
    srcX = (imageWidth - srcWidth) / 2;
  } else {
    // Image is taller than destination, crop the height
    srcHeight = imageWidth / destRatio;
    srcY = (imageHeight - srcHeight) / 2;
  }

  return {
    srcX,
    srcY,
    srcWidth,
    srcHeight,
    destWidth,
    destHeight,
  };
};

const transformImage = (
  originalImage: SkImage,
  targetImage: SharedValue<SkImage | null>,
  width: number,
  height: number,
) => {
  "worklet";
  const imageWidth = originalImage.width();
  const imageHeight = originalImage.height();
  const alphaType = originalImage.getImageInfo().alphaType;
  const colorType = originalImage.getImageInfo().colorType;

  const surface = Skia.Surface.MakeOffscreen(width, height)!;
  const canvas = surface.getCanvas();

  const { srcX, srcY, srcWidth, srcHeight, destWidth, destHeight } =
    getCoverRectangles(imageWidth, imageHeight, width, height);

  canvas.drawImageRect(
    originalImage,
    rect(srcX, srcY, srcWidth, srcHeight),
    rect(0, 0, destWidth, destHeight),
    Skia.Paint(),
  );

  const pixels = Array.from(
    canvas.readPixels(0, 0, {
      alphaType: alphaType,
      colorType: colorType,
      width: width,
      height: height,
    })!,
  );

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (x + y * width) * 4;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      const a = pixels[index + 3];

      const grayscale = (r + g + b) / 3;
      const newPixel = grayscale > threshold ? 255 : 0;
      const error = grayscale - newPixel;

      pixels[index] = pixels[index + 1] = pixels[index + 2] = newPixel;
      pixels[index + 3] = a;

      // Distribute error to neighboring pixels
      if (x + 1 < width) pixels[(x + 1 + y * width) * 4] += (7 / 16) * error;
      if (x - 1 >= 0 && y + 1 < height)
        pixels[(x - 1 + (y + 1) * width) * 4] += (3 / 16) * error;
      if (y + 1 < height) pixels[(x + (y + 1) * width) * 4] += (5 / 16) * error;
      if (x + 1 < width && y + 1 < height)
        pixels[(x + 1 + (y + 1) * width) * 4] += (1 / 16) * error;
    }
  }

  const paint = Skia.Paint();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (x + y * width) * 4;
      const newPixel = pixels[index];

      const monoColor =
        newPixel > threshold ? Skia.Color("#faeed9") : Skia.Color("#000");

      paint.setColor(monoColor);
      canvas.drawRect(rect(x, y, 1, 1), paint);
    }
  }

  surface.flush();
  targetImage.value = surface.makeImageSnapshot();
};
