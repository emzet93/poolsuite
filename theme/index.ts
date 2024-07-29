import { UnistylesRegistry, UnistylesRuntime } from "react-native-unistyles";

import { storage } from "@/storage";
import { appThemes, defaultTheme } from "@/theme/themes";
import { AppThemes } from "@/theme/types";

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}
export const setupThemes = () => {
  UnistylesRegistry.addThemes(appThemes).addConfig({
    initialTheme: restoreTheme() || defaultTheme,
  });
};

export { appThemes, appThemesList, defaultSpacing } from "./themes";

const themeStorageKey = "theme";

export const changeTheme = (themeName: string) => {
  UnistylesRuntime.setTheme(themeName);
  storage.set(themeStorageKey, themeName);
};

export const restoreTheme = () => storage.getString(themeStorageKey);
