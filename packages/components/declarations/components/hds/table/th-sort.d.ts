/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsTableHorizontalAlignmentValues } from './types.ts';
import type { HdsTableHorizontalAlignment, HdsTableThSortOrder, HdsTableThSortOrderLabels } from './types.ts';
import type { HdsTableThButtonSortSignature } from './th-button-sort';
export declare const ALIGNMENTS: string[];
export declare const DEFAULT_ALIGN = HdsTableHorizontalAlignmentValues.Left;
export interface HdsTableThSortSignature {
    Args: {
        align?: HdsTableHorizontalAlignment;
        onClickSort?: HdsTableThButtonSortSignature['Args']['onClick'];
        sortOrder?: HdsTableThSortOrder;
        tooltip?: string;
        width?: string;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsTableThSort extends Component<HdsTableThSortSignature> {
    /**
     * Generates a unique ID for the <span> element ("label")
     *
     * @param labelId
     */
    labelId: string;
    /**
     * @param ariaSort
     * @type {HdsTableThSortOrderLabels}
     * @private
     * @default none
     * @description Sets the aria-sort attribute based on the sort order defined; acceptable values are ascending, descending, none(default) and other. Authors SHOULD only apply this property to table headers or grid headers. If the property is not provided, there is no defined sort order. For each table or grid, authors SHOULD apply aria-sort to only one header at a time.
     */
    get ariaSort(): HdsTableThSortOrderLabels;
    /**
     * @param align
     * @type {HdsTableHorizontalAlignment}
     * @default left
     * @description Determines the text alignment of the header or cell content. Options are: "left", "center", "right". If no align is defined, "left" is used.
     */
    get align(): HdsTableHorizontalAlignment;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=th-sort.d.ts.map