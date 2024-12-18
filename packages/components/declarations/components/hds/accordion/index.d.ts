/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsAccordionItemSignature } from './item/index.ts';
import type { HdsAccordionForceStates, HdsAccordionSizes, HdsAccordionTypes, HdsAccordionItemTitleTags } from './types.ts';
export interface HdsAccordionSignature {
    Args: {
        size?: HdsAccordionSizes;
        type?: HdsAccordionTypes;
        forceState?: HdsAccordionForceStates;
        titleTag?: HdsAccordionItemTitleTags;
    };
    Blocks: {
        default: [
            {
                Item?: ComponentLike<HdsAccordionItemSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsAccordion extends Component<HdsAccordionSignature> {
    /**
     * Sets the size for the component
     *
     * @param size
     * @type {HdsAccordionSizes}
     * @default 'medium'
     */
    get size(): HdsAccordionSizes;
    get titleTag(): HdsAccordionItemTitleTags;
    /**
     * Sets the type of the component
     *
     * @param type
     * @type {HdsAccordionTypes}
     * @default 'card'
     */
    get type(): HdsAccordionTypes;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map