export const hexToRgb = (hex: string) => {
  let bigint = parseInt(hex.slice(1), 16);
  let R = ((bigint >> 16) & 255) / 255;
  let G = ((bigint >> 8) & 255) / 255;
  let B = (bigint & 255) / 255;
  return { R, G, B };
};

export const hexToRgbArray = (hex: string) => {
  const { R, G, B } = hexToRgb(hex);
  return [R, G, B, 1];
};

export const hexToRgbArrayWorklet = (hex: string) => {
  "worklet";
  let bigint = parseInt(hex.slice(1), 16);
  let R = ((bigint >> 16) & 255) / 255;
  let G = ((bigint >> 8) & 255) / 255;
  let B = (bigint & 255) / 255;

  return [R, G, B, 1];
};

export const createColorMatrix = (color1Hex: string, color2Hex: string) => {
  const color1 = hexToRgb(color1Hex);
  const color2 = hexToRgb(color2Hex);

  return [
    color2.R - color1.R,
    0,
    0,
    0,
    color1.R,
    0,
    color2.G - color1.G,
    0,
    0,
    color1.G,
    0,
    0,
    color2.B - color1.B,
    0,
    color1.B,
    0,
    0,
    0,
    1,
    0,
  ];
};
