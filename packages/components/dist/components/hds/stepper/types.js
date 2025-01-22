/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

let HdsStepperStatusesValues = /*#__PURE__*/function (HdsStepperStatusesValues) {
  HdsStepperStatusesValues["Incomplete"] = "incomplete";
  HdsStepperStatusesValues["Progress"] = "progress";
  HdsStepperStatusesValues["Processing"] = "processing";
  HdsStepperStatusesValues["Complete"] = "complete";
  return HdsStepperStatusesValues;
}({});
const HdsStepperStatusToIconsValues = {
  [HdsStepperStatusesValues.Incomplete]: 'circle',
  [HdsStepperStatusesValues.Progress]: 'circle-half',
  [HdsStepperStatusesValues.Processing]: 'loading',
  [HdsStepperStatusesValues.Complete]: 'check-circle'
};

export { HdsStepperStatusToIconsValues, HdsStepperStatusesValues };
//# sourceMappingURL=types.js.map
