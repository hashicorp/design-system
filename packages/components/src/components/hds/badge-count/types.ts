/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsBadgeCountSizeValues {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}
export type HdsBadgeCountSizes = `${HdsBadgeCountSizeValues}`;

export enum HdsBadgeCountTypeValues {
  Filled = 'filled',
  Inverted = 'inverted',
  Outlined = 'outlined',
}
export type HdsBadgeCountTypes = `${HdsBadgeCountTypeValues}`;

export enum HdsBadgeCountColorValues {
  Neutral = 'neutral',
  NeutralDarkMode = 'neutral-dark-mode',
}
export type HdsBadgeCountColors = `${HdsBadgeCountColorValues}`;
