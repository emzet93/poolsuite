export interface Theme {
  name: string;
  imageSource: number;
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
  card: {
    borderRadius: number;
    borderWidth: number;
  };
}

export interface AppThemes {
  [themeName: string]: Theme;
}
