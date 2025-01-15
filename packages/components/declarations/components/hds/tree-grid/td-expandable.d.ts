/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsTreeGridHorizontalAlignmentValues } from './types.ts';
import type { HdsTreeGridHorizontalAlignment } from './types.ts';
import type { HdsTreeGridThButtonExpandSignature } from './th-button-expand';
export declare const ALIGNMENTS: string[];
export declare const DEFAULT_ALIGN = HdsTreeGridHorizontalAlignmentValues.Left;
export interface HdsTreeGridTdExpandSignature {
    Args: {
        align?: HdsTreeGridHorizontalAlignment;
        onClickExpand?: HdsTreeGridThButtonExpandSignature['Args']['onClick'];
        tooltip?: string;
        width?: string;
        isGrid?: boolean;
        didInsert: (element: HTMLTableCellElement, isGrid: boolean) => void;
        onKeyPress?: (event: KeyboardEvent) => void;
        isExpanded?: boolean;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsTreeGridTdExpand extends Component<HdsTreeGridTdExpandSignature> {
    labelId: string;
    get align(): HdsTreeGridHorizontalAlignment;
    get classNames(): string;
}
//# sourceMappingURL=td-expandable.d.ts.map