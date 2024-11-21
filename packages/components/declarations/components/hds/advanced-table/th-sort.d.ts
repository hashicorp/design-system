/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
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
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsAdvancedTableThSort extends Component<HdsAdvancedTableThSortSignature> {
    labelId: string;
    didInsert(element: HTMLDivElement): void;
    /**
     * @param ariaSort
     * @type {HdsAdvancedTableThSortOrderLabels}
     * @private
     * @default none
     * @description Sets the aria-sort attribute based on the sort order defined; acceptable values are ascending, descending, none(default) and other. Authors SHOULD only apply this property to table headers or grid headers. If the property is not provided, there is no defined sort order. For each table or grid, authors SHOULD apply aria-sort to only one header at a time.
     */
    get ariaSort(): HdsAdvancedTableThSortOrderLabels;
    get align(): HdsAdvancedTableHorizontalAlignment;
    get classNames(): string;
}
//# sourceMappingURL=th-sort.d.ts.map