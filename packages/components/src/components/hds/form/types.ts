/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsFormTagValues {
  Form = 'form',
  Div = 'div',
}
export type HdsFormTag = `${HdsFormTagValues}`;

export enum HdsFormHeaderTagValues {
  Div = 'div',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}
export type HdsFormHeaderTag = `${HdsFormHeaderTagValues}`;
