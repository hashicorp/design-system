/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

let HdsFormSuperSelectHorizontalPositionValues = /*#__PURE__*/function (HdsFormSuperSelectHorizontalPositionValues) {
  HdsFormSuperSelectHorizontalPositionValues["Left"] = "left";
  HdsFormSuperSelectHorizontalPositionValues["Center"] = "center";
  HdsFormSuperSelectHorizontalPositionValues["Right"] = "right";
  return HdsFormSuperSelectHorizontalPositionValues;
}({});
// map SuperSelect's `horizontalPosition` values to anchoredPositionModifier's `placement` values
const HdsFormSuperSelectHorizontalPositionToPlacementValues = {
  [HdsFormSuperSelectHorizontalPositionValues.Left]: 'bottom-start',
  [HdsFormSuperSelectHorizontalPositionValues.Center]: 'bottom',
  [HdsFormSuperSelectHorizontalPositionValues.Right]: 'bottom-end'
};

export { HdsFormSuperSelectHorizontalPositionToPlacementValues, HdsFormSuperSelectHorizontalPositionValues };
//# sourceMappingURL=types.js.map
