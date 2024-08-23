/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { FloatingUIOptions } from '../../../../modifiers/hds-anchored-position.ts';

export enum HdsFormSuperSelectHorizontalPositionValues {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export type HdsFormSuperSelectHorizontalPositions =
  `${HdsFormSuperSelectHorizontalPositionValues}`;

// map SuperSelect's `horizontalPosition` values to anchoredPositionModifier's `placement` values
export const HdsFormSuperSelectHorizontalPositionToPlacementValues: Record<
  // SuperSelect's `horizontalPosition` values
  HdsFormSuperSelectHorizontalPositionValues,
  FloatingUIOptions['placement']
> = {
  [HdsFormSuperSelectHorizontalPositionValues.Left]: 'bottom-start',
  [HdsFormSuperSelectHorizontalPositionValues.Center]: 'bottom',
  [HdsFormSuperSelectHorizontalPositionValues.Right]: 'bottom-end',
};
