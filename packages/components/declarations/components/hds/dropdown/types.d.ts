/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { FloatingUIOptions } from '../../../modifiers/hds-anchored-position.ts';
export declare enum HdsDropdownPositionValues {
    BottomLeft = "bottom-left",
    BottomRight = "bottom-right",
    TopLeft = "top-left",
    TopRight = "top-right"
}
export type HdsDropdownPositions = `${HdsDropdownPositionValues}`;
export declare const HdsDropdownPositionToPlacementValues: Record<HdsDropdownPositionValues, FloatingUIOptions['placement']>;
//# sourceMappingURL=types.d.ts.map