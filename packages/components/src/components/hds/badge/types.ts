export enum HdsBadgeSizeValues {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}
export type HdsBadgeSizes = `${HdsBadgeSizeValues}`;

export enum HdsBadgeTypeValues {
  Filled = 'filled',
  Inverted = 'inverted',
  Outlined = 'outlined',
}
export type HdsBadgeTypes = `${HdsBadgeTypeValues}`;

export enum HdsBadgeColorValues {
  Neutral = 'neutral',
  NeutralDarkMode = 'neutral-dark-mode',
  Highlight = 'highlight',
  Success = 'success',
  Warning = 'warning',
  Critical = 'critical',
}
export type HdsBadgeColors = `${HdsBadgeColorValues}`;
