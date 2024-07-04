import { useVideo } from "@shopify/react-native-skia";
import { useAssets } from "expo-asset";

export const useVideoFromAsset = (
  mod: number,
  options?: Parameters<typeof useVideo>[1],
) => {
  const [assets, error] = useAssets([mod]);

  if (error) {
    throw error;
  }
  return useVideo(assets ? assets[0].localUri : null, options);
};
