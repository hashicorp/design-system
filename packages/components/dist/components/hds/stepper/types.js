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
const HdsStepperStatusToSrOnlyText = {
  [HdsStepperStatusesValues.Incomplete]: '',
  [HdsStepperStatusesValues.Progress]: '(current)',
  [HdsStepperStatusesValues.Processing]: '(in progress)',
  [HdsStepperStatusesValues.Complete]: '(complete)'
};
let HdsStepperTitleTagValues = /*#__PURE__*/function (HdsStepperTitleTagValues) {
  HdsStepperTitleTagValues["Div"] = "div";
  HdsStepperTitleTagValues["H1"] = "h1";
  HdsStepperTitleTagValues["H2"] = "h2";
  HdsStepperTitleTagValues["H3"] = "h3";
  HdsStepperTitleTagValues["H4"] = "h4";
  HdsStepperTitleTagValues["H5"] = "h5";
  HdsStepperTitleTagValues["H6"] = "h6";
  return HdsStepperTitleTagValues;
}({});
let HdsStepperNavStatusesValues = /*#__PURE__*/function (HdsStepperNavStatusesValues) {
  HdsStepperNavStatusesValues["Incomplete"] = "incomplete";
  HdsStepperNavStatusesValues["Active"] = "active";
  HdsStepperNavStatusesValues["Complete"] = "complete";
  return HdsStepperNavStatusesValues;
}({});
const HdsStepperNavStatusToIndicatorStatus = {
  [HdsStepperNavStatusesValues.Incomplete]: HdsStepperStatusesValues.Incomplete,
  [HdsStepperNavStatusesValues.Active]: HdsStepperStatusesValues.Progress,
  [HdsStepperNavStatusesValues.Complete]: HdsStepperStatusesValues.Complete
};
const HdsStepperNavStatusToSrOnlyText = {
  [HdsStepperNavStatusesValues.Incomplete]: '',
  [HdsStepperNavStatusesValues.Active]: '(current)',
  [HdsStepperNavStatusesValues.Complete]: '(complete)'
};

export { HdsStepperNavStatusToIndicatorStatus, HdsStepperNavStatusToSrOnlyText, HdsStepperNavStatusesValues, HdsStepperStatusToIconsValues, HdsStepperStatusToSrOnlyText, HdsStepperStatusesValues, HdsStepperTitleTagValues };
//# sourceMappingURL=types.js.map
