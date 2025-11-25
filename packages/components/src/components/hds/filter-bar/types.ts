/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export enum HdsFilterBarFilterTypeValues {
  multiSelect = 'multi-select',
  singleSelect = 'single-select',
  numerical = 'numerical',
  date = 'date',
  time = 'time',
  datetime = 'datetime',
  generic = 'generic',
  search = 'search',
}

export type HdsFilterBarFilterType = `${HdsFilterBarFilterTypeValues}`;

export interface HdsFilterBarGenericFilterData {
  value: unknown;
  label?: string;
}

export interface HdsFilterBarNumericalFilterData {
  selector: HdsFilterBarNumericalFilterSelector;
  value: HdsFilterBarNumericalFilterValue;
}

export interface HdsFilterBarDateFilterData {
  selector: HdsFilterBarDateFilterSelector;
  value: HdsFilterBarDateFilterValue;
}

export type HdsFilterBarData =
  | HdsFilterBarGenericFilterData[]
  | HdsFilterBarGenericFilterData
  | HdsFilterBarNumericalFilterData
  | HdsFilterBarDateFilterData;

export interface HdsFilterBarGenericFilter {
  type: 'generic';
  text?: string;
  dismissTagText?: string;
  data: HdsFilterBarGenericFilterData | HdsFilterBarGenericFilterData[];
}
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

export interface HdsFilterBarNumericalFilter {
  type: 'numerical';
  text?: string;
  data: HdsFilterBarNumericalFilterData;
}

export interface HdsFilterBarDateFilter {
  type: 'date' | 'time' | 'datetime';
  text?: string;
  data: HdsFilterBarDateFilterData;
}

export interface HdsFilterBarSearchFilter {
  type: 'search';
  text?: string;
  data: HdsFilterBarGenericFilterData;
}

export type HdsFilterBarFilter =
  | HdsFilterBarSingleSelectFilter
  | HdsFilterBarMultiSelectFilter
  | HdsFilterBarNumericalFilter
  | HdsFilterBarDateFilter
  | HdsFilterBarSearchFilter
  | HdsFilterBarGenericFilter;

export interface HdsFilterBarFilters {
  [name: string]: HdsFilterBarFilter;
}

export enum HdsFilterBarNumericalFilterSelectorValues {
  lessThan = 'less-than',
  lessThanOrEqualTo = 'less-than-or-equal-to',
  equalTo = 'equal-to',
  greaterThanOrEqualTo = 'greater-than-or-equal-to',
  greaterThan = 'greater-than',
  between = 'between',
}

export type HdsFilterBarNumericalFilterSelector =
  `${HdsFilterBarNumericalFilterSelectorValues}`;

export enum HdsFilterBarDateFilterSelectorValues {
  before = 'before',
  exactly = 'exactly',
  after = 'after',
  between = 'between',
}

export type HdsFilterBarDateFilterSelector =
  `${HdsFilterBarDateFilterSelectorValues}`;

export type HdsFilterBarNumericalFilterValue =
  | number
  | { start?: number; end?: number };

export type HdsFilterBarDateFilterValue =
  | string
  | { start?: string; end?: string };
