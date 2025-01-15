/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsTreeGridHorizontalAlignmentValues } from './types.ts';
import type { HdsTreeGridHorizontalAlignment, HdsTreeGridThSortOrder, HdsTreeGridThSortOrderLabels } from './types.ts';
import type { HdsTreeGridThButtonSortSignature } from './th-button-sort';
export declare const ALIGNMENTS: string[];
export declare const DEFAULT_ALIGN = HdsTreeGridHorizontalAlignmentValues.Left;
export interface HdsTreeGridThSortSignature {
    Args: {
        align?: HdsTreeGridHorizontalAlignment;
        onClickSort?: HdsTreeGridThButtonSortSignature['Args']['onClick'];
        sortOrder?: HdsTreeGridThSortOrder;
        tooltip?: string;
        width?: string;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsTreeGridThSort extends Component<HdsTreeGridThSortSignature> {
    labelId: string;
    didInsert(element: HTMLTableCellElement): void;
    /**
     * @param ariaSort
     * @type {HdsTreeGridThSortOrderLabels}
     * @private
     * @default none
     * @description Sets the aria-sort attribute based on the sort order defined; acceptable values are ascending, descending, none(default) and other. Authors SHOULD only apply this property to table headers or grid headers. If the property is not provided, there is no defined sort order. For each table or grid, authors SHOULD apply aria-sort to only one header at a time.
     */
    get ariaSort(): HdsTreeGridThSortOrderLabels;
    get align(): HdsTreeGridHorizontalAlignment;
    get classNames(): string;
}
//# sourceMappingURL=th-sort.d.ts.map