/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsAlertTypeValues {
  Page = 'page',
  Inline = 'inline',
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

export enum HdsAlertTitleTagValues {
  Div = 'div',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}

export type HdsAlertTitleTags = `${HdsAlertTitleTagValues}`;
