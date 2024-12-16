/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTableHorizontalAlignment, HdsTableScope } from './types.ts';
import { HdsTableHorizontalAlignmentValues } from './types.ts';
export declare const ALIGNMENTS: string[];
export declare const DEFAULT_ALIGN = HdsTableHorizontalAlignmentValues.Left;
export interface HdsTableThSignature {
    Args: {
        align?: HdsTableHorizontalAlignment;
        isVisuallyHidden?: boolean;
        scope?: HdsTableScope;
        tooltip?: string;
        width?: string;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLTableCellElement;
}
export default class HdsTableTh extends Component<HdsTableThSignature> {
    /**
     * Generates a unique ID for the <span> element ("label")
     *
     * @param _labelId
     */
    private _labelId;
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
//# sourceMappingURL=th.d.ts.map