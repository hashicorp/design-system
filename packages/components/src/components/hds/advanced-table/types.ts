/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';

export enum HdsAdvancedTableDensityValues {
  Default = 'default',
  Medium = 'medium',
  Short = 'short',
  Tall = 'tall',
}
export type HdsAdvancedTableDensities = `${HdsAdvancedTableDensityValues}`;

export enum HdsAdvancedTableHorizontalAlignmentValues {
  Center = 'center',
  Left = 'left',
  Right = 'right',
}
export type HdsAdvancedTableHorizontalAlignment =
  `${HdsAdvancedTableHorizontalAlignmentValues}`;

export enum HdsAdvancedTableScopeValues {
  Col = 'col',
  Row = 'row',
}
export type HdsAdvancedTableScope = `${HdsAdvancedTableScopeValues}`;

export enum HdsAdvancedTableThExpandIconValues {
  ChevronRight = 'chevron-right',
  ChevronDown = 'chevron-down',
}
export type HdsAdvancedTableThSortExpandIcons =
  `${HdsAdvancedTableThExpandIconValues}`;

export enum HdsAdvancedTableThSortOrderIconValues {
  ArrowDown = 'arrow-down',
  ArrowUp = 'arrow-up',
  SwapVertical = 'swap-vertical',
}
export type HdsAdvancedTableThSortOrderIcons =
  `${HdsAdvancedTableThSortOrderIconValues}`;

export enum HdsAdvancedTableThSortOrderLabelValues {
  Asc = 'ascending',
  Desc = 'descending',
  None = 'none',
}
export type HdsAdvancedTableThSortOrderLabels =
  `${HdsAdvancedTableThSortOrderLabelValues}`;

export enum HdsAdvancedTableThSortOrderValues {
  Asc = 'asc',
  Desc = 'desc',
}
export type HdsAdvancedTableThSortOrder =
  `${HdsAdvancedTableThSortOrderValues}`;

export enum HdsAdvancedTableVerticalAlignmentValues {
  Baseline = 'baseline',
  Middle = 'middle',
  Top = 'top',
}
export type HdsAdvancedTableVerticalAlignment =
  `${HdsAdvancedTableVerticalAlignmentValues}`;

export type HdsAdvancedTableSelectableRow = {
  checkbox: HdsFormCheckboxBaseSignature['Element'];
  selectionKey: string;
};

interface BaseHdsAdvancedTableColumn {
  align?: HdsAdvancedTableHorizontalAlignment;
  isVisuallyHidden?: boolean;
  label: string;
  sortingFunction?: HdsAdvancedTableSortingFunction<unknown>;
  tooltip?: string;
  width?: string;
}

interface SortableHdsAdvancedTableColumn extends BaseHdsAdvancedTableColumn {
  isSortable: true;
  key: string;
}

interface NonSortableHdsAdvancedTableColumn extends BaseHdsAdvancedTableColumn {
  isSortable?: false;
  key?: string;
}

export type HdsAdvancedTableColumn =
  | SortableHdsAdvancedTableColumn
  | NonSortableHdsAdvancedTableColumn;

export type HdsAdvancedTableSortingFunction<T> = (a: T, b: T) => number;

export interface HdsAdvancedTableOnSelectionChangeSignature {
  selectionKey?: string;
  selectionCheckboxElement?: HdsFormCheckboxBaseSignature['Element'];
  selectedRowsKeys: string[];
  selectableRowsStates: {
    selectionKey: string;
    isSelected?: boolean;
  }[];
}

export type HdsAdvancedTableModel = Array<Record<string, unknown>>;
