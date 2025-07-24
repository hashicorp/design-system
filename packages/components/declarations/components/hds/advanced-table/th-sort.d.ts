/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { type FocusableElement } from 'tabbable';
import type Owner from '@ember/owner';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.ts';
import type { HdsAdvancedTableHorizontalAlignment, HdsAdvancedTableThSortOrder, HdsAdvancedTableThSortOrderLabels } from './types.ts';
import type { HdsAdvancedTableThButtonSortSignature } from './th-button-sort.ts';
import type { HdsAdvancedTableThSignature } from './th.ts';
import type { HdsAdvancedTableSignature } from './index.ts';
export declare const ALIGNMENTS: string[];
export declare const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;
export interface HdsAdvancedTableThSortSignature {
    Args: {
        column?: HdsAdvancedTableThSignature['Args']['column'];
        align?: HdsAdvancedTableHorizontalAlignment;
        hasResizableColumns: HdsAdvancedTableSignature['Args']['hasResizableColumns'];
        onClickSort?: HdsAdvancedTableThButtonSortSignature['Args']['onClick'];
        sortOrder?: HdsAdvancedTableThSortOrder;
        tooltip?: string;
        rowspan?: number;
        colspan?: number;
        tableHeight?: number;
        isStickyColumn?: boolean;
        isStickyColumnPinned?: boolean;
        onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
    };
    Blocks: {
        default?: [];
    };
    Element: HTMLDivElement;
}
export default class HdsAdvancedTableThSort extends Component<HdsAdvancedTableThSortSignature> {
    private _labelId;
    private _element;
    private _shouldTrapFocus;
    private _resizeHandleElement?;
    constructor(owner: Owner, args: HdsAdvancedTableThSortSignature['Args']);
    get ariaSort(): HdsAdvancedTableThSortOrderLabels;
    get align(): HdsAdvancedTableHorizontalAlignment;
    get showContextMenu(): boolean;
    get classNames(): string;
    onFocusTrapDeactivate(): void;
    enableFocusTrap(): void;
    getInitialFocus(): FocusableElement | undefined;
    setElement(element: HTMLDivElement): void;
    private _registerResizeHandleElement;
}
