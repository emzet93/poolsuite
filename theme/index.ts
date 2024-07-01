import { UnistylesRegistry } from "react-native-unistyles";

import { poolsuite } from "@/theme/themes";
import { AppThemes } from "@/theme/types";

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}
export const setupThemes = () => {
  UnistylesRegistry.addThemes({
    poolsuite,
  });
};
