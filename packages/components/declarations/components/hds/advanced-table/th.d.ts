/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { type FocusableElement } from 'tabbable';
import type { HdsAdvancedTableHorizontalAlignment, HdsAdvancedTableScope } from './types.ts';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.ts';
export declare const ALIGNMENTS: string[];
export declare const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;
export interface HdsAdvancedTableThSignature {
    Args: {
        align?: HdsAdvancedTableHorizontalAlignment;
        isVisuallyHidden?: boolean;
        scope?: HdsAdvancedTableScope;
        tooltip?: string;
        rowspan?: number;
        colspan?: number;
        newLabel?: string;
        isExpandable?: boolean;
        parentId?: string;
        onClickToggle?: () => void;
        isExpanded?: boolean;
        depth?: number;
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
    private _observer;
    get scope(): HdsAdvancedTableScope;
    get role(): string;
    get align(): HdsAdvancedTableHorizontalAlignment;
    get rowspan(): string;
    get colspan(): string | undefined;
    get paddingLeft(): string | undefined;
    get classNames(): string;
    onFocusTrapDeactivate(): void;
    enableFocusTrap(): void;
    getInitialFocus(): FocusableElement | undefined;
    didInsert(element: HTMLDivElement): void;
    willDestroy(): void;
}
//# sourceMappingURL=th.d.ts.map