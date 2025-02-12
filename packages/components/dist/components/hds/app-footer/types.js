/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

let HdsAppFooterStatusValues = /*#__PURE__*/function (HdsAppFooterStatusValues) {
  HdsAppFooterStatusValues["Operational"] = "operational";
  HdsAppFooterStatusValues["Degraded"] = "degraded";
  HdsAppFooterStatusValues["Maintenance"] = "maintenance";
  HdsAppFooterStatusValues["Outage"] = "outage";
  return HdsAppFooterStatusValues;
}({});
const HdsAppFooterStatusLinkStatusValues = {
  [HdsAppFooterStatusValues.Operational]: {
    text: 'System operational',
    iconName: 'check-circle'
  },
  [HdsAppFooterStatusValues.Degraded]: {
    text: 'System degraded',
    iconName: 'alert-triangle'
  },
  [HdsAppFooterStatusValues.Maintenance]: {
    text: 'System maintenance',
    iconName: 'alert-triangle'
  },
  [HdsAppFooterStatusValues.Outage]: {
    text: 'System outage',
    iconName: 'x-circle'
  }
};
let HdsAppFooterThemeValues = /*#__PURE__*/function (HdsAppFooterThemeValues) {
  HdsAppFooterThemeValues["Light"] = "light";
  HdsAppFooterThemeValues["Dark"] = "dark";
  return HdsAppFooterThemeValues;
}({});

export { HdsAppFooterStatusLinkStatusValues, HdsAppFooterStatusValues, HdsAppFooterThemeValues };
//# sourceMappingURL=types.js.map
