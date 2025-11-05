/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsFilterBarFilterTypeValues {
  multiSelect = 'multi-select',
  singleSelect = 'single-select',
  range = 'range',
  generic = 'generic',
  search = 'search',
}

export type HdsFilterBarFilterType = `${HdsFilterBarFilterTypeValues}`;

export interface HdsFilterBarGenericFilterData {
  value: unknown;
}

export interface HdsFilterBarRangeFilterData {
  selector: HdsFilterBarRangeFilterSelector;
  value: number;
}

export type HdsFilterBarData =
  | HdsFilterBarGenericFilterData[]
  | HdsFilterBarGenericFilterData
  | HdsFilterBarRangeFilterData;

export interface HdsFilterBarSingleSelectFilter {
  type: 'single-select';
  text?: string;
  data: HdsFilterBarGenericFilterData;
}

export interface HdsFilterBarMultiSelectFilter {
  type: 'multi-select';
  text?: string;
  data: HdsFilterBarGenericFilterData[];
}

export interface HdsFilterBarRangeFilter {
  type: 'range';
  text?: string;
  data: HdsFilterBarRangeFilterData;
}

export interface HdsFilterBarSearchFilter {
  type: 'search';
  text?: string;
  data: HdsFilterBarGenericFilterData;
}

export type HdsFilterBarFilter =
  | HdsFilterBarSingleSelectFilter
  | HdsFilterBarMultiSelectFilter
  | HdsFilterBarRangeFilter
  | HdsFilterBarSearchFilter;

export interface HdsFilterBarFilters {
  [name: string]: HdsFilterBarFilter;
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
