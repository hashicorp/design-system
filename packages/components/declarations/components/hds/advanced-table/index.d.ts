/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import type Owner from '@ember/owner';
import { HdsAdvancedTableDensityValues, HdsAdvancedTableVerticalAlignmentValues } from './types.ts';
import type { HdsAdvancedTableColumn, HdsAdvancedTableDensities, HdsAdvancedTableHorizontalAlignment, HdsAdvancedTableOnSelectionChangeSignature, HdsAdvancedTableThSortOrder, HdsAdvancedTableVerticalAlignment, HdsAdvancedTableModel, HdsAdvancedTableExpandState } from './types.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base.ts';
import type HdsAdvancedTableTd from './td.ts';
import type HdsAdvancedTableTh from './th.ts';
import type HdsAdvancedTableTr from './tr.ts';
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
        isSelectable?: boolean;
        isStriped?: boolean;
        model: HdsAdvancedTableModel;
        selectionAriaLabelSuffix?: string;
        sortBy?: string;
        selectableColumnKey?: string;
        sortedMessageText?: string;
        sortOrder?: HdsAdvancedTableThSortOrder;
        valign?: HdsAdvancedTableVerticalAlignment;
        hasResizableColumns?: boolean;
        hasStickyHeader?: boolean;
        hasStickyFirstColumn?: boolean;
        childrenKey?: string;
        maxHeight?: string;
        onColumnResize?: (columnKey: string, newWidth?: string) => void;
        onSelectionChange?: (selection: HdsAdvancedTableOnSelectionChangeSignature) => void;
        onSort?: (sortBy: string, sortOrder: HdsAdvancedTableThSortOrder) => void;
    };
    Blocks: {
        body?: [
            {
                Td?: WithBoundArgs<typeof HdsAdvancedTableTd, 'align'>;
                Tr?: WithBoundArgs<typeof HdsAdvancedTableTr, 'selectionScope' | 'isLastRow' | 'isSelectable' | 'onSelectionChange' | 'didInsert' | 'willDestroy' | 'selectionAriaLabelSuffix' | 'hasStickyColumn' | 'isStickyColumnPinned' | 'isParentRow' | 'depth' | 'displayRow'>;
                Th?: WithBoundArgs<typeof HdsAdvancedTableTh, 'depth' | 'isExpandable' | 'isExpanded' | 'newLabel' | 'parentId' | 'scope' | 'isStickyColumn' | 'isStickyColumnPinned' | 'onClickToggle'>;
                data?: Record<string, unknown>;
                rowIndex?: number | string;
                isOpen?: HdsAdvancedTableExpandState;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsAdvancedTable extends Component<HdsAdvancedTableSignature> {
    private _selectAllCheckbox?;
    private _isSelectAllCheckboxSelected?;
    private _tableHeight;
    private _selectableRows;
    private _captionId;
    private _tableModel;
    private _scrollHandler;
    private _resizeObserver;
    private _theadElement;
    scrollIndicatorDimensions: {
        bottom: string;
        height: string;
        left: string;
        right: string;
        top: string;
        width: string;
    };
    isStickyColumnPinned: boolean;
    isStickyHeaderPinned: boolean;
    showScrollIndicatorLeft: boolean;
    showScrollIndicatorRight: boolean;
    showScrollIndicatorTop: boolean;
    showScrollIndicatorBottom: boolean;
    stickyColumnOffset: string;
    constructor(owner: Owner, args: HdsAdvancedTableSignature['Args']);
    get identityKey(): string | undefined;
    get childrenKey(): string;
    get hasScrollIndicator(): boolean;
    get sortedMessageText(): string;
    get isSelectable(): boolean;
    get isStriped(): boolean;
    get density(): HdsAdvancedTableDensities;
    get hasStickyHeader(): boolean;
    get valign(): HdsAdvancedTableVerticalAlignment;
    get gridTemplateColumns(): string;
    get classNames(): string;
    get theadClassNames(): string;
    private _setColumnWidth;
    private _setUpScrollWrapper;
    private _setUpThead;
    onSelectionChangeCallback(checkbox?: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string): void;
    setupTableModelData(): void;
    onSelectionAllChange(): void;
    onSelectionRowChange(checkbox?: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string): void;
    didInsertSelectAllCheckbox(checkbox: HdsFormCheckboxBaseSignature['Element']): void;
    willDestroySelectAllCheckbox(): void;
    didInsertRowCheckbox(checkbox: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string): void;
    willDestroyRowCheckbox(selectionKey?: string): void;
    setSelectAllState(): void;
}
