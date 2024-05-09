/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsLinkIconPositionValues {
  Leading = 'leading',
  Trailing = 'trailing',
}

export type HdsLinkIconPositions = `${HdsLinkIconPositionValues}`;

export enum HdsLinkColorValues {
  Primary = 'primary',
  Secondary = 'secondary',
}

export type HdsLinkColors = `${HdsLinkColorValues}`;

export enum HdsLinkStandaloneSizeValues {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type HdsLinkStandaloneSizes = `${HdsLinkStandaloneSizeValues}`;
