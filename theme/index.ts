import { UnistylesRegistry } from "react-native-unistyles";

import { appThemes } from "@/theme/themes";
import { AppThemes } from "@/theme/types";

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}
export const setupThemes = () => {
  UnistylesRegistry.addThemes(appThemes).addConfig({
    initialTheme: "Poolsuite FM",
  });
};

export { appThemes, appThemesList, defaultSpacing } from "./themes";
