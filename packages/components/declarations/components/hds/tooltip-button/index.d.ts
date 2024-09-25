/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { Props as TippyProps } from 'tippy.js';
import { HdsTooltipPlacementValues } from './types.ts';
export declare const PLACEMENTS: string[];
export interface HdsTooltipSignature {
    Args: {
        extraTippyOptions: Omit<TippyProps, 'placement' | 'offset'>;
        isInline?: boolean;
        offset?: [number, number];
        placement: HdsTooltipPlacementValues;
        text: string;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLButtonElement;
}
export default class HdsTooltip extends Component<HdsTooltipSignature> {
    /**
     * @param text
     * @type {string}
     * @description text content for tooltip
     */
    get text(): string;
    get options(): TippyProps;
    /**
     * @param isInline
     * @type {boolean}
     * @default true
     * @description sets display for the button
     */
    get isInline(): boolean;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map