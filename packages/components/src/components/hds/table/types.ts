/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsTableVerticalAlignValues {
  Top = 'top',
  Middle = 'middle',
  Baseline = 'baseline',
}

export type HdsTableVerticalAlign = `${HdsTableVerticalAlignValues}`;

export enum HdsTableDensityValues {
  Short = 'short',
  Medium = 'medium',
  Tall = 'tall',
}

export type HdsTableDensity = `${HdsTableDensityValues}`;

export enum HdsTableCellTextAlignValues {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export type HdsTableCellTextAlign = `${HdsTableCellTextAlignValues}`;
