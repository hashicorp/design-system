/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export interface HdsFilterBarFilter {
  text: string;
  value: unknown;
}

export interface HdsFilterBarFilters {
  [name: string]: HdsFilterBarFilter[] | undefined;
}
