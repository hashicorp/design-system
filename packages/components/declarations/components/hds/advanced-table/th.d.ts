/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
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
        width?: string;
        rowspan?: number;
        colspan?: number;
        isExpandable?: boolean;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLTableCellElement;
}
export default class HdsAdvancedTableTh extends Component<HdsAdvancedTableThSignature> {
    labelId: string;
    didInsert(element: HTMLTableCellElement): void;
    get scope(): HdsAdvancedTableScope;
    get role(): string;
    get align(): HdsAdvancedTableHorizontalAlignment;
    get classNames(): string;
}
//# sourceMappingURL=th.d.ts.map