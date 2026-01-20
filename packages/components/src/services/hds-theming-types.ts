export enum HdsThemeValues {
  // default (original HDS)
  Default = 'default',
  // system settings (prefers-color-scheme)
  System = 'system',
  // user settings for dark/light
  Light = 'light',
  Dark = 'dark',
}

export enum HdsModesBaseValues {
  Default = 'default',
}

export enum HdsModesLightValues {
  CdsG0 = 'cds-g0',
  CdsG10 = 'cds-g10',
}

export enum HdsModesDarkValues {
  CdsG90 = 'cds-g90',
  CdsG100 = 'cds-g100',
}

export type HdsThemes = `${HdsThemeValues}`;
export type HdsModes =
  | `${HdsModesBaseValues}`
  | `${HdsModesLightValues}`
  | `${HdsModesDarkValues}`;
export type HdsModesLight = `${HdsModesLightValues}`;
export type HdsModesDark = `${HdsModesDarkValues}`;

export type HdsThemingOptions = {
  lightTheme: HdsModesLight;
  darkTheme: HdsModesDark;
};

export type HdsOnSetThemeCallbackArgs = {
  currentTheme: HdsThemes | undefined;
  currentMode: HdsModes | undefined;
};

export type HdsOnSetThemeCallback = (args: HdsOnSetThemeCallbackArgs) => void;
