export type HdsTextTags = keyof HTMLElementTagNameMap;

export enum HdsTextColorValues {
  Primary = 'primary',
  Strong = 'strong',
  Faint = 'faint',
  Disabled = 'disabled',
  HighContrast = 'high-contrast',
  Action = 'action',
  ActionHover = 'action-hover',
  ActionActive = 'action-active',
  Highlight = 'highlight',
  HighlightOnSurface = 'highlight-on-surface',
  HighlightHighContrast = 'highlight-high-contrast',
  Success = 'success',
  SuccessOnSurface = 'success-on-surface',
  SuccessHighContrast = 'success-high-contrast',
  Warning = 'warning',
  WarningOnSurface = 'warning-on-surface',
  WarningHighContrast = 'warning-high-contrast',
  Critical = 'critical',
  CriticalOnSurface = 'critical-on-surface',
  CriticalHighContrast = 'critical-high-contrast',
}
export type HdsTextColors = `${HdsTextColorValues}`;

export enum HdsTextAlignValues {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}
export type HdsTextAligns = `${HdsTextAlignValues}`;

export enum HdsTextWeightValues {
  Regular = 'regular',
  Medium = 'medium',
  Semibold = 'semibold',
  Bold = 'bold',
}
export type HdsTextWeights = `${HdsTextWeightValues}`;

export enum HdsTextSizeValues {
  FiveHundred = 500,
  FourHundred = 400,
  ThreeHundred = 300,
  TwoHundred = 200,
  OneHundred = 100,
}
type HdsTextSizesString = `${HdsTextSizeValues}`;
type HdsTextSizesNumber =
  `${HdsTextSizeValues}` extends `${infer T extends number}` ? T : never;
export type HdsTextSizes = HdsTextSizesString | HdsTextSizesNumber;

export enum HdsTextGroupValues {
  Code = 'code',
  Display = 'display',
  Body = 'body',
}
export type HdsTextGroups = `${HdsTextGroupValues}`;
