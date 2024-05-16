/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsCopyButtonSizeValues {
  Small = 'small',
  Medium = 'medium',
}
export type HdsCopyButtonSizes = `${HdsCopyButtonSizeValues}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HdsCopyButtonTargetToCopy = string | ((...args: any[]) => void);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HdsCopyButtonTextToCopy = string | ((...args: any[]) => void);
