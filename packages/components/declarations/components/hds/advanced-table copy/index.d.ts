/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import { HdsAdvancedTableDensityValues, HdsAdvancedTableVerticalAlignmentValues } from './types.ts';
import type { HdsAdvancedTableColumn, HdsAdvancedTableDensities, HdsAdvancedTableHorizontalAlignment, HdsAdvancedTableOnSelectionChangeSignature, HdsAdvancedTableSortingFunction, HdsAdvancedTableThSortOrder, HdsAdvancedTableVerticalAlignment, HdsAdvancedTableModel } from './types';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type { HdsAdvancedTableTdSignature } from './td.ts';
import type { HdsAdvancedTableThSignature } from './th.ts';
import type { HdsAdvancedTableTrSignature } from './tr.ts';
export declare const DENSITIES: HdsAdvancedTableDensities[];
export declare const DEFAULT_DENSITY = HdsAdvancedTableDensityValues.Medium;
export declare const VALIGNMENTS: HdsAdvancedTableVerticalAlignment[];
export declare const DEFAULT_VALIGN = HdsAdvancedTableVerticalAlignmentValues.Top;
export interface HdsAdvancedTableSignature {
    Args: {
        align?: HdsAdvancedTableHorizontalAlignment;
        caption?: string;
        columns: HdsAdvancedTableColumn[];
        density?: HdsAdvancedTableDensities;
        identityKey?: string;
        childrenKey?: string;
        isSelectable?: boolean;
        isStriped?: boolean;
        model: HdsAdvancedTableModel;
        onSelectionChange?: (selection: HdsAdvancedTableOnSelectionChangeSignature) => void;
        onSort?: (sortBy: string, sortOrder: HdsAdvancedTableThSortOrder) => void;
        selectionAriaLabelSuffix?: string;
        sortBy?: string;
        selectableColumnKey?: string;
        sortedMessageText?: string;
        sortOrder?: HdsAdvancedTableThSortOrder;
        valign?: HdsAdvancedTableVerticalAlignment;
        hasStickyHeader?: boolean;
    };
    Blocks: {
        body?: [
            {
                Td?: ComponentLike<HdsAdvancedTableTdSignature>;
                Tr?: ComponentLike<HdsAdvancedTableTrSignature>;
                Th?: ComponentLike<HdsAdvancedTableThSignature>;
                data?: Record<string, unknown>;
                isExpanded?: boolean;
                rowIndex?: string | number;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsAdvancedTable extends Component<HdsAdvancedTableSignature> {
    private _sortBy;
    private _sortOrder;
    private _selectAllCheckbox?;
    private _isSelectAllCheckboxSelected?;
    private _selectableRows;
    private _captionId;
    didInsert(element: HTMLDivElement): void;
    get getSortCriteria(): string | HdsAdvancedTableSortingFunction<unknown>;
    get columnWidths(): string[] | undefined;
    get identityKey(): string | undefined;
    get childrenKey(): string;
    get hasNestedRows(): boolean;
    get sortedMessageText(): string;
    get isSelectable(): boolean;
    get isStriped(): boolean;
    get density(): HdsAdvancedTableDensities;
    get valign(): HdsAdvancedTableVerticalAlignment;
    get gridTemplateColumns(): string;
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