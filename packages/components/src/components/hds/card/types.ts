/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsCardBackgroundValues {
  NeutralPrimary = 'neutral-primary',
  NeutralSecondary = 'neutral-secondary',
}

export type HdsCardBackground =
  | HdsCardBackgroundValues.NeutralSecondary
  | HdsCardBackgroundValues.NeutralPrimary;

export enum HdsCardLevelValues {
  Base = 'base',
  Mid = 'mid',
  High = 'high',
}

export type HdsCardLevel =
  | HdsCardLevelValues.Base
  | HdsCardLevelValues.Mid
  | HdsCardLevelValues.High;

export enum HdsCardOverflowValues {
  Hidden = 'hidden',
  Visible = 'visible',
}

export type HdsCardOverflow =
  | HdsCardOverflowValues.Hidden
  | HdsCardOverflowValues.Visible;
