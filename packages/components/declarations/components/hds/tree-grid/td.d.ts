/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTreeGridHorizontalAlignment } from './types.ts';
import { HdsTreeGridHorizontalAlignmentValues } from './types.ts';
export declare const ALIGNMENTS: string[];
export declare const DEFAULT_ALIGN = HdsTreeGridHorizontalAlignmentValues.Left;
export interface HdsTreeGridTdSignature {
    Args: {
        align?: HdsTreeGridHorizontalAlignment;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLTableCellElement;
}
export default class HdsTreeGridTd extends Component<HdsTreeGridTdSignature> {
    didInsert(element: HTMLTableCellElement): void;
    get align(): HdsTreeGridHorizontalAlignment;
    get classNames(): string;
}
//# sourceMappingURL=td.d.ts.map