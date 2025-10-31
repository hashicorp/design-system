/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export interface HdsFilterBarSelectionFilterData {
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

export interface HdsFilterBarRangeFilterData {
  selector: HdsFilterBarRangeFilterSelector;
  value: number;
}

export enum HdsFilterBarFilterTypeValues {
  multiSelect = 'multi-select',
  singleSelect = 'single-select',
  range = 'range',
  generic = 'generic',
}

export type HdsFilterBarFilterType = `${HdsFilterBarFilterTypeValues}`;

export type HdsFilterBarData =
  | HdsFilterBarSelectionFilterData[]
  | HdsFilterBarSelectionFilterData
  | HdsFilterBarRangeFilterData;

export interface HdsFilterBarSingleSelectFilter {
  type: 'single-select';
  data: HdsFilterBarSelectionFilterData;
}

export interface HdsFilterBarMultiSelectFilter {
  type: 'multi-select';
  data: HdsFilterBarSelectionFilterData[];
}

export interface HdsFilterBarRangeFilter {
  type: 'range';
  data: HdsFilterBarRangeFilterData;
}

export type HdsFilterBarFilter =
  | HdsFilterBarSingleSelectFilter
  | HdsFilterBarMultiSelectFilter
  | HdsFilterBarRangeFilter;

export interface HdsFilterBarFilters {
  [name: string]: HdsFilterBarFilter;
}
