/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsModalSizeValues {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}
export type HdsModalSizes = `${HdsModalSizeValues}`;

export enum HdsModalColorValues {
  Neutral = 'neutral',
  Warning = 'warning',
  Critical = 'critical',
}
export type HdsModalColors = `${HdsModalColorValues}`;
