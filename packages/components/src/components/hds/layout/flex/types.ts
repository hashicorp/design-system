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
