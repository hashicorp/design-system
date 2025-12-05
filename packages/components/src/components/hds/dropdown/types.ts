/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { HdsAnchoredPositionOptions } from '../../../modifiers/hds-anchored-position.ts';

export enum HdsDropdownPositionValues {
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  TopLeft = 'top-left',
  TopRight = 'top-right',
}
export type HdsDropdownPositions = `${HdsDropdownPositionValues}`;

// map Dropdown's `listPosition` values to PopoverPrimitive's `placement` values for backwards compatibility
export const HdsDropdownPositionToPlacementValues: Record<
  // Dropdown's `listPosition` values
  HdsDropdownPositionValues,
  HdsAnchoredPositionOptions['placement']
> = {
  [HdsDropdownPositionValues.BottomLeft]: 'bottom-start',
  [HdsDropdownPositionValues.BottomRight]: 'bottom-end',
  [HdsDropdownPositionValues.TopLeft]: 'top-start',
  [HdsDropdownPositionValues.TopRight]: 'top-end',
};
