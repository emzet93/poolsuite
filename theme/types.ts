export interface Theme {
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
  poolsuite: Theme;
}
