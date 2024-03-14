export enum BackgroundValues {
  NeutralPrimary = 'neutral-primary',
  NeutralSecondary = 'neutral-secondary',
}

export type Background = BackgroundValues.NeutralSecondary | BackgroundValues.NeutralPrimary;

export enum LevelValues {
  Base = 'base',
  Mid = 'mid',
  High = 'high',
}

export type Level = LevelValues.Base | LevelValues.Mid | LevelValues.High;

export enum OverflowValues {
  Hidden = 'hidden',
  Visible = 'visible',
}

export type Overflow = OverflowValues.Hidden | OverflowValues.Visible;