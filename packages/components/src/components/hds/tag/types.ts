/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsTagColorValues {
  Primary = 'primary',
  Secondary = 'secondary',
}
export type HdsTagColors = `${HdsTagColorValues}`;

export enum HdsTagTooltipPlacementValues {
  Top = 'top',
  TopStart = 'top-start',
  TopEnd = 'top-end',
  Right = 'right',
  RightStart = 'right-start',
  RightEnd = 'right-end',
  Bottom = 'bottom',
  BottomStart = 'bottom-start',
  BottomEnd = 'bottom-end',
  Left = 'left',
  LeftStart = 'left-start',
  LeftEnd = 'left-end',
}

export type HdsTagTooltipPlacements = `${HdsTagTooltipPlacementValues}`;
