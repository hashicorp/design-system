/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsButtonSizeValues {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}
export type HdsButtonSizes = `${HdsButtonSizeValues}`;

export enum HdsButtonColorValues {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Critical = 'critical',
}
export type HdsButtonColors = `${HdsButtonColorValues}`;

export enum HdsButtonIconPositionValues {
  Leading = 'leading',
  Trailing = 'trailing',
}
export type HdsButtonIconPositions = `${HdsButtonIconPositionValues}`;
