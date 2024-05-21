/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// I tried to keep the types in the same order as the explorer file structure
// this was not possible in all cases because some definitions are used in other files for computations
// but it should mostly work

// index types (table)
export enum HdsTableVerticalAlignValues {
  Top = 'top',
  Middle = 'middle',
  Baseline = 'baseline',
}

export type HdsTableVerticalAlign = `${HdsTableVerticalAlignValues}`;

export enum HdsTableDensityValues {
  Short = 'short',
  Medium = 'medium',
  Tall = 'tall',
}

export type HdsTableDensity = `${HdsTableDensityValues}`;

export enum HdsTableCellTextAlignValues {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export type HdsTableCellTextAlign = `${HdsTableCellTextAlignValues}`;

// td types (I don't think there are any that aren't already declared)

// th-sort types (has to come before th-button-sort types)
export enum HdsTableSortOrderValues {
  Asc = 'asc',
  Desc = 'desc',
  None = 'none',
  Other = 'other',
}

export type HdsTableSortOrder = `${HdsTableSortOrderValues}`;

export enum HdsTableSortOrderLongValues {
  Ascending = 'ascending',
  Descending = 'descending',
  None = 'none',
  Other = 'other',
}

export type HdsTableSortOrderLong = `${HdsTableSortOrderLongValues}`;

export const HdsTableSortOrderMapValues = {
  [HdsTableSortOrderValues.Asc]: HdsTableSortOrderLongValues.Ascending,
  [HdsTableSortOrderValues.Desc]: HdsTableSortOrderLongValues.Descending,
  [HdsTableSortOrderValues.None]: HdsTableSortOrderLongValues.None,
  [HdsTableSortOrderValues.Other]: HdsTableSortOrderLongValues.Other,
};

// th-button-sort types

export enum HdsThButtonSortIconValues {
  ArrowUp = 'arrow-up',
  ArrowDown = 'arrow-down',
  SwapVertical = 'swap-vertical',
}

export type HdsThButtonSortIcon = `${HdsThButtonSortIconValues}`;

export const HdsThButtonSortIconMapValues = {
  [HdsTableSortOrderValues.Asc]: HdsThButtonSortIconValues.ArrowUp,
  [HdsTableSortOrderValues.Desc]: HdsThButtonSortIconValues.ArrowDown,
  [HdsTableSortOrderValues.None]: HdsThButtonSortIconValues.SwapVertical,
};

// th-button-tooltip types

// th-selectable types
export type SelectableRow = {
  selectionKey: string;
  checkbox: HTMLInputElement;
};

export type SelectionChangeInfo = {
  selectionKey: string;
  selectionCheckboxElement: HTMLInputElement;
  selectedRowsKeys: string[];
  selectableRowsStates: SelectableRowState[];
};

export type SelectableRowState = {
  selectionKey: string;
  isSelected: boolean;
};

// th types

// tr types
