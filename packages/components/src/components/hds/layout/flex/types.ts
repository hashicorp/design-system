/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsLayoutFlexDirectionValues {
  Row = 'row',
  Column = 'column',
}

export type HdsLayoutFlexDirections = `${HdsLayoutFlexDirectionValues}`;

export enum HdsLayoutFlexJustifyValues {
  Start = 'start',
  Center = 'center',
  End = 'end',
  SpaceBetween = 'space-between',
  SpaceAround = 'space-around',
  SpaceEvenly = 'space-evenly',
}

export type HdsLayoutFlexJustifys = `${HdsLayoutFlexJustifyValues}`;

export enum HdsLayoutFlexAlignValues {
  Start = 'start',
  Center = 'center',
  End = 'end',
  Stretch = 'stretch',
}

export type HdsLayoutFlexAligns = `${HdsLayoutFlexAlignValues}`;

export enum HdsLayoutFlexGapValues {
  'Zero' = '0',
  'Four' = '4',
  'Eight' = '8',
  'Twelve' = '12',
  'Sixteen' = '16',
  'TwentyFour' = '24',
  'ThirtyTwo' = '32',
  'FortyEight' = '48',
}

export type HdsLayoutFlexGaps = `${HdsLayoutFlexGapValues}`;

// A list of all existing tag names in the HTMLElementTagNameMap interface
export type AvailableTagNames = keyof HTMLElementTagNameMap;
// A union of all types in the HTMLElementTagNameMap interface
export type AvailableElements =
  HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
