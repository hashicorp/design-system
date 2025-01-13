/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { type FocusableElement } from 'tabbable';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.ts';
import type { HdsAdvancedTableHorizontalAlignment, HdsAdvancedTableThSortOrder, HdsAdvancedTableThSortOrderLabels } from './types.ts';
import type { HdsAdvancedTableThButtonSortSignature } from './th-button-sort';
export declare const ALIGNMENTS: string[];
export declare const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;
export interface HdsAdvancedTableThSortSignature {
    Args: {
        align?: HdsAdvancedTableHorizontalAlignment;
        onClickSort?: HdsAdvancedTableThButtonSortSignature['Args']['onClick'];
        sortOrder?: HdsAdvancedTableThSortOrder;
        tooltip?: string;
        rowspan?: number;
        colspan?: number;
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
    private _observer;
    get ariaSort(): HdsAdvancedTableThSortOrderLabels;
    get align(): HdsAdvancedTableHorizontalAlignment;
    get classNames(): string;
    onFocusTrapDeactivate(): void;
    enableFocusTrap(): void;
    getInitialFocus(): FocusableElement | undefined;
    didInsert(element: HTMLDivElement): void;
    willDestroy(): void;
}
//# sourceMappingURL=th-sort.d.ts.map