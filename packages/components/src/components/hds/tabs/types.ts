/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsTabsSizeValues {
  Medium = 'medium',
  Large = 'large',
}

export type HdsTabsSizes = `${HdsTabsSizeValues}`;

export type HdsTabsPanelIds = string[];

export type HdsTabsTabIds = string[];
