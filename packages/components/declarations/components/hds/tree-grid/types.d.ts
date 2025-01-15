/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
export declare enum HdsTreeGridDensityValues {
    Default = "default",
    Medium = "medium",
    Short = "short",
    Tall = "tall"
}
export type HdsTreeGridDensities = `${HdsTreeGridDensityValues}`;
export declare enum HdsTreeGridHorizontalAlignmentValues {
    Center = "center",
    Left = "left",
    Right = "right"
}
export type HdsTreeGridHorizontalAlignment = `${HdsTreeGridHorizontalAlignmentValues}`;
export declare enum HdsTreeGridScopeValues {
    Col = "col",
    Row = "row"
}
export type HdsTreeGridScope = `${HdsTreeGridScopeValues}`;
export declare enum HdsTreeGridThSortOrderIconValues {
    ArrowDown = "arrow-down",
    ArrowUp = "arrow-up",
    SwapVertical = "swap-vertical"
}
export type HdsTreeGridThSortOrderIcons = `${HdsTreeGridThSortOrderIconValues}`;
export declare enum HdsTreeGridThExpandIconValues {
    ChevronRight = "chevron-right",
    ChevronDown = "chevron-down"
}
export type HdsTreeGridThExpandIcons = `${HdsTreeGridThExpandIconValues}`;
export declare enum HdsTreeGridThSortOrderLabelValues {
    Asc = "ascending",
    Desc = "descending",
    None = "none"
}
export type HdsTreeGridThSortOrderLabels = `${HdsTreeGridThSortOrderLabelValues}`;
export declare enum HdsTreeGridThSortOrderValues {
    Asc = "asc",
    Desc = "desc"
}
export type HdsTreeGridThSortOrder = `${HdsTreeGridThSortOrderValues}`;
export declare enum HdsTreeGridVerticalAlignmentValues {
    Baseline = "baseline",
    Middle = "middle",
    Top = "top"
}
export type HdsTreeGridVerticalAlignment = `${HdsTreeGridVerticalAlignmentValues}`;
export type HdsTreeGridSelectableRow = {
    checkbox: HdsFormCheckboxBaseSignature['Element'];
    selectionKey: string;
};
interface BaseHdsTreeGridColumn {
    align?: HdsTreeGridHorizontalAlignment;
    isVisuallyHidden?: boolean;
    label: string;
    sortingFunction?: HdsTreeGridSortingFunction<unknown>;
    tooltip?: string;
    width?: string;
}
interface SorTreeGridHdsTreeGridColumn extends BaseHdsTreeGridColumn {
    isSortable: true;
    key: string;
}
interface NonSorTreeGridHdsTreeGridColumn extends BaseHdsTreeGridColumn {
    isSortable?: false;
    key?: string;
}
export type HdsTreeGridColumn = SorTreeGridHdsTreeGridColumn | NonSorTreeGridHdsTreeGridColumn;
export type HdsTreeGridSortingFunction<T> = (a: T, b: T) => number;
export interface HdsTreeGridOnSelectionChangeSignature {
    selectionKey?: string;
    selectionCheckboxElement?: HdsFormCheckboxBaseSignature['Element'];
    selectedRowsKeys: string[];
    selectableRowsStates: {
        selectionKey: string;
        isSelected?: boolean;
    }[];
}
export interface HdsTreeGridItem {
    children?: HdsTreeGridItem[];
    defaultIsExpanded?: boolean;
    [key: string]: unknown;
}
export type HdsTreeGridModel = Array<HdsTreeGridItem>;
export {};
//# sourceMappingURL=types.d.ts.map