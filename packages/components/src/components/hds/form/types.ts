/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsFormTagValues {
  Form = 'form',
  Div = 'div',
}
export type HdsFormTags = `${HdsFormTagValues}`;

export enum HdsFormHeaderTitleTagValues {
  Div = 'div',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}
export type HdsFormHeaderTitleTags = `${HdsFormHeaderTitleTagValues}`;

export default {
  HdsFormTagValues,
  HdsFormHeaderTitleTagValues,
};
