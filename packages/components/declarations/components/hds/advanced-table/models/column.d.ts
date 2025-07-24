/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type HdsAdvancedTableModel from './table.ts';
import type { HdsAdvancedTableHorizontalAlignment, HdsAdvancedTableColumn as HdsAdvancedTableColumnType } from '../types';
export declare const DEFAULT_MIN_WIDTH = "150px";
export declare const DEFAULT_MAX_WIDTH = "800px";
export default class HdsAdvancedTableColumn {
    label: string;
    align?: HdsAdvancedTableHorizontalAlignment;
    isExpandable?: boolean;
    isReorderable?: boolean;
    isSortable?: boolean;
    isVisuallyHidden?: boolean;
    key?: string;
    minWidth?: `${number}px`;
    maxWidth?: `${number}px`;
    tooltip?: string;
    width?: string;
    originalWidth?: string;
    imposedWidthDelta: number;
    sortingFunction?: (a: unknown, b: unknown) => number;
    table: HdsAdvancedTableModel;
    get pxWidth(): number | undefined;
    set pxWidth(value: number);
    get pxMinWidth(): number | undefined;
    get pxMaxWidth(): number | undefined;
    get index(): number;
    get isFirst(): boolean;
    get isLast(): boolean;
    get siblings(): {
        previous?: HdsAdvancedTableColumn;
        next?: HdsAdvancedTableColumn;
    };
    constructor(args: {
        column: HdsAdvancedTableColumnType;
        table: HdsAdvancedTableModel;
    });
    private _setWidthValues;
    setPxWidth(newPxWidth: number): void;
    onPreviousColumnWidthRestored(): void;
    onNextColumnWidthRestored(imposedWidthDelta: number): void;
    restoreWidth(): void;
}
