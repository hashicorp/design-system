/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { type FocusableElement } from 'tabbable';
import HdsAdvancedTableColumn from './models/column.ts';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.ts';
import type Owner from '@ember/owner';
import type { HdsAdvancedTableHorizontalAlignment, HdsAdvancedTableScope, HdsAdvancedTableExpandState } from './types.ts';
import type { HdsAdvancedTableSignature } from './index.ts';
export declare const ALIGNMENTS: string[];
export declare const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;
export interface HdsAdvancedTableThSignature {
    Args: {
        align?: HdsAdvancedTableHorizontalAlignment;
        column?: HdsAdvancedTableColumn;
        colspan?: number;
        depth?: number;
        hasExpandAllButton?: boolean;
        hasResizableColumns?: boolean;
        isExpanded?: HdsAdvancedTableExpandState;
        isExpandable?: boolean;
        isStickyColumn?: boolean;
        isStickyColumnPinned?: boolean;
        isVisuallyHidden?: boolean;
        newLabel?: string;
        parentId?: string;
        rowspan?: number;
        scope?: HdsAdvancedTableScope;
        tooltip?: string;
        tableHeight?: number;
        didInsertExpandButton?: (button: HTMLButtonElement) => void;
        onClickToggle?: () => void;
        onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
        willDestroyExpandButton?: (button: HTMLButtonElement) => void;
    };
    Blocks: {
        default?: [];
    };
    Element: HTMLDivElement;
}
export default class HdsAdvancedTableTh extends Component<HdsAdvancedTableThSignature> {
    private _labelId;
    private _element;
    private _shouldTrapFocus;
    private _resizeHandleElement?;
    constructor(owner: Owner, args: HdsAdvancedTableThSignature['Args']);
    get scope(): HdsAdvancedTableScope;
    get role(): string;
    get align(): HdsAdvancedTableHorizontalAlignment;
    get rowspan(): string;
    get colspan(): string | undefined;
    get paddingLeft(): string | undefined;
    get classNames(): string;
    get showContextMenu(): boolean;
    onFocusTrapDeactivate(): void;
    enableFocusTrap(): void;
    getInitialFocus(): FocusableElement | undefined;
    setElement(element: HTMLDivElement): void;
    private _registerResizeHandleElement;
    private _manageExpandButton;
}
