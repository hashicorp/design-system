/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base.ts';
export declare enum HdsAdvancedTableDensityValues {
    Default = "default",
    Medium = "medium",
    Short = "short",
    Tall = "tall"
}
export type HdsAdvancedTableDensities = `${HdsAdvancedTableDensityValues}`;
export declare enum HdsAdvancedTableHorizontalAlignmentValues {
    Center = "center",
    Left = "left",
    Right = "right"
}
export type HdsAdvancedTableHorizontalAlignment = `${HdsAdvancedTableHorizontalAlignmentValues}`;
export declare enum HdsAdvancedTableScopeValues {
    Col = "col",
    Row = "row"
}
export type HdsAdvancedTableScope = `${HdsAdvancedTableScopeValues}`;
export declare enum HdsAdvancedTableThExpandIconValues {
    ChevronUp = "chevron-up",
    ChevronDown = "chevron-down",
    UnfoldOpen = "unfold-open",
    UnfoldClose = "unfold-close"
}
export type HdsAdvancedTableThSortExpandIcons = `${HdsAdvancedTableThExpandIconValues}`;
export declare enum HdsAdvancedTableThSortOrderIconValues {
    ArrowDown = "arrow-down",
    ArrowUp = "arrow-up",
    SwapVertical = "swap-vertical"
}
export type HdsAdvancedTableThSortOrderIcons = `${HdsAdvancedTableThSortOrderIconValues}`;
export declare enum HdsAdvancedTableThSortOrderLabelValues {
    Asc = "ascending",
    Desc = "descending",
    None = "none"
}
export type HdsAdvancedTableThSortOrderLabels = `${HdsAdvancedTableThSortOrderLabelValues}`;
export declare enum HdsAdvancedTableThSortOrderValues {
    Asc = "asc",
    Desc = "desc"
}
export type HdsAdvancedTableThSortOrder = `${HdsAdvancedTableThSortOrderValues}`;
export declare enum HdsAdvancedTableVerticalAlignmentValues {
    Baseline = "baseline",
    Middle = "middle",
    Top = "top"
}
export type HdsAdvancedTableVerticalAlignment = `${HdsAdvancedTableVerticalAlignmentValues}`;
export type HdsAdvancedTableSelectableRow = {
    checkbox: HdsFormCheckboxBaseSignature['Element'];
    selectionKey: string;
};
export type HdsAdvancedTableExpandState = boolean;
interface BaseHdsAdvancedTableColumn {
    align?: HdsAdvancedTableHorizontalAlignment;
    isVisuallyHidden?: boolean;
    label: string;
    sortingFunction?: HdsAdvancedTableSortingFunction<unknown>;
    tooltip?: string;
    width?: string;
    minWidth?: `${number}px`;
    maxWidth?: `${number}px`;
}
interface SortableHdsAdvancedTableColumn extends BaseHdsAdvancedTableColumn {
    isSortable: true;
    key: string;
}
interface NonSortableHdsAdvancedTableColumn extends BaseHdsAdvancedTableColumn {
    isSortable?: false;
    key?: string;
    isExpandable?: boolean;
}
export type HdsAdvancedTableColumn = SortableHdsAdvancedTableColumn | NonSortableHdsAdvancedTableColumn;
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
export {};
