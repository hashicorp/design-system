/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import HdsAdvancedTableRow from './row.ts';
import HdsAdvancedTableColumn from './column.ts';
import type { HdsAdvancedTableSignature } from '../index.ts';
import type { HdsAdvancedTableExpandState, HdsAdvancedTableSortingFunction } from '../types';
type HdsAdvancedTableTableArgs = Pick<HdsAdvancedTableSignature['Args'], 'model' | 'columns' | 'childrenKey' | 'hasResizableColumns' | 'sortBy' | 'sortOrder' | 'onSort'>;
export default class HdsAdvancedTableTableModel {
    columns: HdsAdvancedTableColumn[];
    rows: HdsAdvancedTableRow[];
    sortBy: HdsAdvancedTableTableArgs['sortBy'];
    sortOrder: HdsAdvancedTableTableArgs['sortOrder'];
    childrenKey?: HdsAdvancedTableTableArgs['childrenKey'];
    hasResizableColumns?: HdsAdvancedTableTableArgs['hasResizableColumns'];
    onSort?: HdsAdvancedTableSignature['Args']['onSort'];
    constructor(args: HdsAdvancedTableTableArgs);
    get sortCriteria(): string | HdsAdvancedTableSortingFunction<unknown>;
    get sortedRows(): HdsAdvancedTableRow[];
    get totalRowCount(): number;
    get flattenedVisibleRows(): HdsAdvancedTableRow[];
    get lastVisibleRow(): HdsAdvancedTableRow | undefined;
    get hasRowsWithChildren(): boolean;
    get allRowsAreOpen(): boolean;
    get expandState(): HdsAdvancedTableExpandState;
    setupData(args: Pick<HdsAdvancedTableTableArgs, 'model' | 'columns' | 'sortBy' | 'sortOrder'>): void;
    restoreColumnWidths(): void;
    setSortBy(column: string): void;
    openAll(): void;
    collapseAll(): void;
    toggleAll(): void;
}
export {};
