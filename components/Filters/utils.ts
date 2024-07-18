export const hexToRgb = (hex: string) => {
  let bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return { R: r / 255, G: g / 255, B: b / 255 };
};

export const createColorMatrix = (color1Hex: string, color2Hex: string) => {
  const color1 = hexToRgb(color1Hex);
  const color2 = hexToRgb(color2Hex);

  return [
    color1.R,
    color2.R - color1.R,
    0,
    0,
    0,
    color1.G,
    color2.G - color1.G,
    0,
    0,
    0,
    color1.B,
    color2.B - color1.B,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
  ];
};
