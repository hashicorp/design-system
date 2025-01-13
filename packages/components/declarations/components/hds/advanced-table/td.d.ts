/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { type FocusableElement } from 'tabbable';
import type { HdsAdvancedTableHorizontalAlignment } from './types.ts';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.ts';
export declare const ALIGNMENTS: string[];
export declare const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;
export interface HdsAdvancedTableTdSignature {
    Args: {
        align?: HdsAdvancedTableHorizontalAlignment;
        rowspan?: number;
        colspan?: number;
    };
    Blocks: {
        default?: [];
    };
    Element: HTMLDivElement;
}
export default class HdsAdvancedTableTd extends Component<HdsAdvancedTableTdSignature> {
    private _shouldTrapFocus;
    private _element;
    private _observer;
    get rowspan(): string;
    get colspan(): string | undefined;
    get align(): HdsAdvancedTableHorizontalAlignment;
    get classNames(): string;
    onFocusTrapDeactivate(): void;
    enableFocusTrap(): void;
    getInitialFocus(): FocusableElement | undefined;
    didInsert(element: HTMLDivElement): void;
    willDestroy(): void;
}
//# sourceMappingURL=td.d.ts.map