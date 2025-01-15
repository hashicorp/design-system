/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTreeGridHorizontalAlignment, HdsTreeGridScope } from './types.ts';
import { HdsTreeGridHorizontalAlignmentValues } from './types.ts';
export declare const ALIGNMENTS: string[];
export declare const DEFAULT_ALIGN = HdsTreeGridHorizontalAlignmentValues.Left;
export interface HdsTreeGridThSignature {
    Args: {
        align?: HdsTreeGridHorizontalAlignment;
        isVisuallyHidden?: boolean;
        scope?: HdsTreeGridScope;
        tooltip?: string;
        width?: string;
        isExpandable?: boolean;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLTableCellElement;
}
export default class HdsTreeGridTh extends Component<HdsTreeGridThSignature> {
    labelId: string;
    isExpanded: boolean;
    onClickExpand(): void;
    didInsert(element: HTMLTableCellElement): void;
    get align(): HdsTreeGridHorizontalAlignment;
    get classNames(): string;
}
//# sourceMappingURL=th.d.ts.map