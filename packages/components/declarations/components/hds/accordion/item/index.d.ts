/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsAccordionSizeValues, HdsAccordionTypeValues } from '../types.ts';
import type { HdsAccordionForceStates, HdsAccordionSizes, HdsAccordionTypes, HdsAccordionItemTitleTags } from '../types.ts';
export declare const SIZES: string[];
export declare const DEFAULT_SIZE = HdsAccordionSizeValues.Medium;
export declare const TYPES: string[];
export declare const DEFAULT_TYPE = HdsAccordionTypeValues.Card;
export interface HdsAccordionItemSignature {
    Args: {
        ariaLabel?: string;
        containsInteractive?: boolean;
        forceState?: HdsAccordionForceStates;
        isOpen?: boolean;
        isStatic?: boolean;
        onClickToggle?: (event: MouseEvent, ...args: any[]) => void;
        size?: HdsAccordionSizes;
        titleTag?: HdsAccordionItemTitleTags;
        type?: HdsAccordionTypes;
    };
    Blocks: {
        toggle?: [];
        content: [
            {
                close: (...args: any[]) => void;
            }
        ];
    };
    Element: HTMLElement;
}
export default class HdsAccordionItem extends Component<HdsAccordionItemSignature> {
    /**
     * Generates a unique ID for the Content
     *
     * @param contentId
     */
    contentId: string;
    titleId: string;
    get ariaLabelledBy(): string | undefined;
    /**
     * @param containsInteractive
     * @type {boolean}
     * @default false
     */
    get containsInteractive(): boolean;
    /**
     * @param toggleTextSize
     * @type {HdsTextSizes}
     * @default 'medium'
     */
    get toggleTextSize(): number;
    /**
     * Sets the size for the component
     *
     * @param size
     * @type {HdsAccordionSizes}
     * @default 'medium'
     */
    get size(): HdsAccordionSizes;
    /**
     * Sets the type of the component
     *
     * @param type
     * @type {HdsAccordionTypes}
     * @default 'card'
     */
    get type(): HdsAccordionTypes;
    get titleTag(): HdsAccordionItemTitleTags;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map