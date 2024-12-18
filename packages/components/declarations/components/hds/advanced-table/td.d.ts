/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { SafeString } from '@ember/template/-private/handlebars';
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
        default: [];
    };
    Element: HTMLTableCellElement;
}
export default class HdsAdvancedTableTd extends Component<HdsAdvancedTableTdSignature> {
    didInsert(element: HTMLTableCellElement): void;
    get style(): SafeString | undefined;
    get align(): HdsAdvancedTableHorizontalAlignment;
    get classNames(): string;
}
//# sourceMappingURL=td.d.ts.map