/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsSeparatorSpacingValues } from './types.ts';
import type { HdsSeparatorSpacing } from './types.ts';
export declare const DEFAULT_SPACING = HdsSeparatorSpacingValues.TwentyFour;
export declare const SPACING: string[];
interface HdsSeparatorSignature {
    Args: {
        spacing?: HdsSeparatorSpacing;
    };
    Element: HTMLElement;
}
export default class HdsSeparatorComponent extends Component<HdsSeparatorSignature> {
    /**
     * Sets the margin for the separator
     * Accepted values: 24, 0
     *
     * @param spacing
     * @type {HdsSeparatorSpacing}
     * @default 24
     */
    get spacing(): HdsSeparatorSpacing;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
export {};
//# sourceMappingURL=index.d.ts.map