/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsLayoutGridAlignValues {
  Start = 'start',
  Center = 'center',
  End = 'end',
  Stretch = 'stretch',
}

export type HdsLayoutGridAligns = `${HdsLayoutGridAlignValues}`;

export enum HdsLayoutGridGapValues {
  'Four' = '4',
  'Eight' = '8',
  'Twelve' = '12',
  'Sixteen' = '16',
  'Twentyfour' = '24',
  'Thirtytwo' = '32',
  'Fortyeight' = '48',
}

export type HdsLayoutGridGaps = `${HdsLayoutGridGapValues}`;

// A list of all existing tag names in the HTMLElementTagNameMap interface
export type AvailableTagNames = keyof HTMLElementTagNameMap;
// A union of all types in the HTMLElementTagNameMap interface
export type AvailableElements =
  HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
