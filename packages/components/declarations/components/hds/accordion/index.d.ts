/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsAccordionItemSignature } from './item/index.ts';
import type { HdsAccordionForceStates, HdsAccordionSizes, HdsAccordionTypes } from './types.ts';
interface HdsAccordionSignature {
    Args: {
        size?: HdsAccordionSizes;
        type?: HdsAccordionTypes;
        forceState?: HdsAccordionForceStates;
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
export default class HdsAccordionComponent extends Component<HdsAccordionSignature> {
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
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
export {};
//# sourceMappingURL=index.d.ts.map