/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';

export enum HdsTableDensityValues {
  Default = 'default',
  Medium = 'medium',
  Short = 'short',
  Tall = 'tall',
}
export type HdsTableDensities = `${HdsTableDensityValues}`;

export enum HdsTableHorizontalAlignmentValues {
  Center = 'center',
  Left = 'left',
  Right = 'right',
}
export type HdsTableHorizontalAlignment =
  `${HdsTableHorizontalAlignmentValues}`;

export enum HdsTableScopeValues {
  Col = 'col',
  Row = 'row',
}
export type HdsTableScope = `${HdsTableScopeValues}`;

export enum HdsTableThSortOrderIconValues {
  ArrowDown = 'arrow-down',
  ArrowUp = 'arrow-up',
  SwapVertical = 'swap-vertical',
}
export type HdsTableThSortOrderIcons = `${HdsTableThSortOrderIconValues}`;

export enum HdsTableThSortOrderLabelValues {
  Asc = 'ascending',
  Desc = 'descending',
  None = 'none',
}
export type HdsTableThSortOrderLabels = `${HdsTableThSortOrderLabelValues}`;

export enum HdsTableThSortOrderValues {
  Asc = 'asc',
  Desc = 'desc',
}
export type HdsTableThSortOrder = `${HdsTableThSortOrderValues}`;

export enum HdsTableVerticalAlignmentValues {
  Baseline = 'baseline',
  Middle = 'middle',
  Top = 'top',
}
export type HdsTableVerticalAlignment = `${HdsTableVerticalAlignmentValues}`;

export type HdsTableSelectableRow = {
  checkbox: HdsFormCheckboxBaseSignature['Element'];
  selectionKey: string;
};

interface BaseHdsTableColumn {
  align?: HdsTableHorizontalAlignment;
  isVisuallyHidden?: boolean;
  label: string;
  sortingFunction?: HdsTableSortingFunction<unknown>;
  tooltip?: string;
  width?: string;
}

interface SortableHdsTableColumn extends BaseHdsTableColumn {
  isSortable: true;
  key: string;
}

interface NonSortableHdsTableColumn extends BaseHdsTableColumn {
  isSortable?: false;
  key?: string;
}

export type HdsTableColumn = SortableHdsTableColumn | NonSortableHdsTableColumn;

export type HdsTableSortingFunction<T> = (a: T, b: T) => number;

export interface HdsTableOnSelectionChangeSignature {
  selectionKey?: string;
  selectionCheckboxElement?: HdsFormCheckboxBaseSignature['Element'];
  selectedRowsKeys: string[];
  selectableRowsStates: {
    selectionKey: string;
    isSelected?: boolean;
  }[];
}

export type HdsTableModel = Array<Record<string, unknown>>;
