/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTableHorizontalAlignment } from './types.ts';
import { HdsTableHorizontalAlignmentValues } from './types.ts';
export declare const ALIGNMENTS: string[];
export declare const DEFAULT_ALIGN = HdsTableHorizontalAlignmentValues.Left;
export interface HdsTableTdArgs {
    Args: {
        align?: HdsTableHorizontalAlignment;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLTableCellElement;
}
export default class HdsTableTd extends Component<HdsTableTdArgs> {
    /**
     * @param align
     * @type {string}
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
//# sourceMappingURL=td.d.ts.map