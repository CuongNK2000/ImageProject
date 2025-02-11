type colorTheme = {
  bgTest: string;
  textColor: string;
  errorText: string;
  background: string;
  backgroundFeature: string;
  backgroundHeader: string;
  btnOpacity: string;
  btnColor: string;
  bgAccount: string;
};

export interface ThemeApp {
  id: number;
  colors: colorTheme;
}
