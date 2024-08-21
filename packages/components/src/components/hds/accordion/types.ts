/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsAccordionTypeValues {
  Card = 'card',
  Flush = 'flush',
}
export type HdsAccordionTypes = `${HdsAccordionTypeValues}`;

export enum HdsAccordionSizeValues {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}
export type HdsAccordionSizes = `${HdsAccordionSizeValues}`;

export enum HdsAccordionForceStateValues {
  Open = 'open',
  Close = 'close',
}
export type HdsAccordionForceStates = `${HdsAccordionForceStateValues}`;

export enum HdsAccordionItemTagValues {
  Div = 'div',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}

export type HdsAccordionItemTags = `${HdsAccordionItemTagValues}`;
