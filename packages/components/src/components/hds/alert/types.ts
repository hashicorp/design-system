/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsAlertTypeValues {
  Page = 'page',
  Inlne = 'inline',
  Compact = 'compact',
}
export type HdsAlertTypes = `${HdsAlertTypeValues}`;

export enum HdsAlertColorValues {
  Neutral = 'neutral',
  Highlight = 'highlight',
  Success = 'success',
  Warning = 'warning',
  Critical = 'critical',
}
export type HdsAlertColors = `${HdsAlertColorValues}`;
