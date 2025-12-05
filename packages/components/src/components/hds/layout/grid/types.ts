/**
 * Copyright IBM Corp. 2021, 2025
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
  'Zero' = '0',
  'Four' = '4',
  'Eight' = '8',
  'Twelve' = '12',
  'Sixteen' = '16',
  'TwentyFour' = '24',
  'ThirtyTwo' = '32',
  'FortyEight' = '48',
}

export type HdsLayoutGridGaps = `${HdsLayoutGridGapValues}`;

// A list of all existing tag names in the HTMLElementTagNameMap interface
export type AvailableTagNames = keyof HTMLElementTagNameMap;
// A union of all types in the HTMLElementTagNameMap interface
export type AvailableElements =
  HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
