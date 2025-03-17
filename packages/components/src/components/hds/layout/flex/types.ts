/**
 * Copyright (c) HashiCorp, Inc.
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
  'Four' = '4',
  'Eight' = '8',
  'Twelve' = '12',
  'Sixteen' = '16',
  'Twentyfour' = '24',
  'Thirtytwo' = '32',
  'Fortyeight' = '48',
}

export type HdsLayoutFlexGaps = `${HdsLayoutFlexGapValues}`;

// A list of all existing tag names in the HTMLElementTagNameMap interface
export type AvailableTagNames = keyof HTMLElementTagNameMap;
// A union of all types in the HTMLElementTagNameMap interface
export type AvailableElements =
  HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
