/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
export declare enum HdsFormTagValues {
    Form = "form",
    Div = "div"
}
export type HdsFormTags = `${HdsFormTagValues}`;
export declare enum HdsFormHeaderTitleTagValues {
    Div = "div",
    H1 = "h1",
    H2 = "h2",
    H3 = "h3",
    H4 = "h4",
    H5 = "h5",
    H6 = "h6"
}
export type HdsFormHeaderTitleTags = `${HdsFormHeaderTitleTagValues}`;
declare const _default: {
    HdsFormTagValues: typeof HdsFormTagValues;
    HdsFormHeaderTitleTagValues: typeof HdsFormHeaderTitleTagValues;
};
export default _default;
