export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
  };
  spacing: {
    xxs: number;
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
}

export interface AppThemes {
  [themeName: string]: Theme;
}
