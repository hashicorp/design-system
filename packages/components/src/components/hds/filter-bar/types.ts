/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export interface HdsFilterBarSelectionFilter {
  text: string;
  value: unknown;
}

export enum HdsFilterBarRangeFilterSelectorValues {
  lessThan = 'less-than',
  lessThanOrEqualTo = 'less-than-or-equal-to',
  equalTo = 'equal-to',
  greaterThanOrEqualTo = 'greater-than-or-equal-to',
  greaterThan = 'greater-than',
}

export type HdsFilterBarRangeFilterSelector =
  `${HdsFilterBarRangeFilterSelectorValues}`;

export interface HdsFilterBarRangeFilter {
  selector: HdsFilterBarRangeFilterSelector;
  value: number;
}

export enum HdsFilterBarFilterTypeValues {
  multiSelect = 'multi-select',
  singleSelect = 'single-select',
  range = 'range',
}

export type HdsFilterBarFilterType = `${HdsFilterBarFilterTypeValues}`;

export type HdsFilterBarData =
  | HdsFilterBarSelectionFilter[]
  | HdsFilterBarSelectionFilter
  | HdsFilterBarRangeFilter;

export interface HdsFilterBarFilter {
  type?: HdsFilterBarFilterType;
  data?: HdsFilterBarData;
}

// export interface HdsFilterBarFilters {
//   [name: string]: HdsFilterBarFilter[] | HdsFilterBarFilter | undefined;
// }

export interface HdsFilterBarFilters {
  [name: string]: HdsFilterBarFilter;
}
