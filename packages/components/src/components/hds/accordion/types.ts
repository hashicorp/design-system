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
