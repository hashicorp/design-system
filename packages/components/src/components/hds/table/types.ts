/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

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

export enum HdsTableSortOrderValues {
  Asc = 'asc',
  Desc = 'desc',
}

export type HdsTableSortOrderValues = `${HdsTableSortOrderValues}`;
