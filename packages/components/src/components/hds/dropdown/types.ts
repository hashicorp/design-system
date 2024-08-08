/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { FloatingUIOptions } from '../../../modifiers/hds-anchored-position.ts';

export enum HdsDropdownPositionValues {
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  TopLeft = 'top-left',
  TopRight = 'top-right',
}
export type HdsDropdownPositions = `${HdsDropdownPositionValues}`;

// map Dropdown's `listPosition` values to PopoverPrimitive's `placement` values for backwards compatibility
export const HdsDropdownPositionToPlacementValues: Record<
  HdsDropdownPositionValues,
  FloatingUIOptions['placement']
> = {
  [HdsDropdownPositionValues.BottomLeft]: 'bottom-start',
  [HdsDropdownPositionValues.BottomRight]: 'bottom-end',
  [HdsDropdownPositionValues.TopLeft]: 'top-start',
  [HdsDropdownPositionValues.TopRight]: 'top-end',
};
