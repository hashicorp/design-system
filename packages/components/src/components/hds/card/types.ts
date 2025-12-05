/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsCardBackgroundValues {
  NeutralPrimary = 'neutral-primary',
  NeutralSecondary = 'neutral-secondary',
}

export type HdsCardBackground = `${HdsCardBackgroundValues}`;

export enum HdsCardLevelValues {
  Base = 'base',
  Mid = 'mid',
  High = 'high',
}

export type HdsCardLevel = `${HdsCardLevelValues}`;

export enum HdsCardOverflowValues {
  Hidden = 'hidden',
  Visible = 'visible',
}

export type HdsCardOverflow = `${HdsCardOverflowValues}`;

export enum HdsCardTagValues {
  Div = 'div',
  Li = 'li',
}

export type HdsCardTag = `${HdsCardTagValues}`;
