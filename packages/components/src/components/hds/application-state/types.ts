/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsApplicationStateAlignValues {
  Left = 'left',
  Center = 'center',
}
export type HdsApplicationStateAligns = `${HdsApplicationStateAlignValues}`;

export enum HdsApplicationStateTitleTagValues {
  Div = 'div',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}

<<<<<<< HEAD
export type HdsApplicationStateTitleTags = `${HdsApplicationStateTitleTagValues}`;
=======
export type HdsApplicationStateTitleTags =
  `${HdsApplicationStateTitleTagValues}`;
>>>>>>> 32f391db3 (fix: implement feedback)
