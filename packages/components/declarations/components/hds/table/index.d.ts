/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import { HdsTableDensityValues, HdsTableThSortOrderValues, HdsTableVerticalAlignmentValues } from './types.ts';
import type { HdsTableColumn, HdsTableDensities, HdsTableHorizontalAlignment, HdsTableOnSelectionChangeSignature, HdsTableSelectableRow, HdsTableSortingFunction, HdsTableThSortOrder, HdsTableVerticalAlignment, HdsTableModel } from './types';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type { HdsTableTdSignature } from './td.ts';
import type { HdsTableThSignature } from './th.ts';
import type { HdsTableThSortSignature } from './th-sort.ts';
import type { HdsTableTrSignature } from './tr.ts';
export declare const DENSITIES: HdsTableDensities[];
export declare const DEFAULT_DENSITY = HdsTableDensityValues.Medium;
export declare const VALIGNMENTS: HdsTableVerticalAlignment[];
export declare const DEFAULT_VALIGN = HdsTableVerticalAlignmentValues.Top;
export interface HdsTableSignature {
    Args: {
        align?: HdsTableHorizontalAlignment;
        caption?: string;
        columns?: HdsTableColumn[];
        density?: HdsTableDensities;
        identityKey?: string;
        isFixedLayout?: boolean;
        isSelectable?: boolean;
        isStriped?: boolean;
        model?: HdsTableModel;
        onSelectionChange?: (selection: HdsTableOnSelectionChangeSignature) => void;
        onSort?: (sortBy: string, sortOrder: HdsTableThSortOrder) => void;
        selectionAriaLabelSuffix?: string;
        sortBy?: string;
        selectableColumnKey?: string;
        sortedMessageText?: string;
        sortOrder?: HdsTableThSortOrder;
        valign?: HdsTableVerticalAlignment;
    };
    Blocks: {
        head?: [
            {
                Tr?: ComponentLike<HdsTableTrSignature>;
                Th?: ComponentLike<HdsTableThSignature>;
                ThSort?: ComponentLike<HdsTableThSortSignature>;
                sortBy?: string;
                sortOrder?: HdsTableThSortOrder;
                setSortBy?: (column: string) => void;
            }
        ];
        body?: [
            {
                Td?: ComponentLike<HdsTableTdSignature>;
                Tr?: ComponentLike<HdsTableTrSignature>;
                Th?: ComponentLike<HdsTableThSignature>;
                data?: Record<string, unknown>;
                rowIndex?: number;
                sortBy?: string;
                sortOrder?: HdsTableThSortOrder;
            }
        ];
    };
    Element: HTMLTableElement;
}
export default class HdsTable extends Component<HdsTableSignature> {
    sortBy: string | undefined;
    sortOrder: "desc" | "asc" | HdsTableThSortOrderValues;
    selectAllCheckbox?: HdsFormCheckboxBaseSignature['Element'];
    selectableRows: HdsTableSelectableRow[];
    isSelectAllCheckboxSelected?: boolean;
    constructor(owner: unknown, args: HdsTableSignature['Args']);
    get getSortCriteria(): string | HdsTableSortingFunction<unknown>;
    get identityKey(): string | undefined;
    get sortedMessageText(): string;
    get isStriped(): boolean;
    get isFixedLayout(): boolean;
    get density(): HdsTableDensities;
    get valign(): HdsTableVerticalAlignment;
    get classNames(): string;
    setSortBy(column: string): void;
    onSelectionChangeCallback(checkbox?: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string): void;
    onSelectionAllChange(): void;
    onSelectionRowChange(checkbox?: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string): void;
    didInsertSelectAllCheckbox(checkbox: HdsFormCheckboxBaseSignature['Element']): void;
    willDestroySelectAllCheckbox(): void;
    didInsertRowCheckbox(checkbox: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string): void;
    willDestroyRowCheckbox(selectionKey?: string): void;
    setSelectAllState(): void;
}
//# sourceMappingURL=index.d.ts.map