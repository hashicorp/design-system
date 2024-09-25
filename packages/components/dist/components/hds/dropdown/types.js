/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

let HdsDropdownPositionValues = /*#__PURE__*/function (HdsDropdownPositionValues) {
  HdsDropdownPositionValues["BottomLeft"] = "bottom-left";
  HdsDropdownPositionValues["BottomRight"] = "bottom-right";
  HdsDropdownPositionValues["TopLeft"] = "top-left";
  HdsDropdownPositionValues["TopRight"] = "top-right";
  return HdsDropdownPositionValues;
}({});
// map Dropdown's `listPosition` values to PopoverPrimitive's `placement` values for backwards compatibility
const HdsDropdownPositionToPlacementValues = {
  [HdsDropdownPositionValues.BottomLeft]: 'bottom-start',
  [HdsDropdownPositionValues.BottomRight]: 'bottom-end',
  [HdsDropdownPositionValues.TopLeft]: 'top-start',
  [HdsDropdownPositionValues.TopRight]: 'top-end'
};

export { HdsDropdownPositionToPlacementValues, HdsDropdownPositionValues };
//# sourceMappingURL=types.js.map
