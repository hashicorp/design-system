/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsAccordionItemSignature {
    Args: {
        ariaLabel?: string;
        containsInteractive?: boolean;
        isOpen?: boolean;
    };
    Blocks: {
        content?: [];
        toggle?: [];
    };
    Element: HTMLElement;
}
export default class HdsAccordionItemComponent extends Component<HdsAccordionItemSignature> {
    /**
     * Generates a unique ID for the Content
     *
     * @param contentId
     */
    contentId: string;
    /**
     * @param ariaLabel
     * @type {string}
     * @default 'Toggle display'
     */
    get ariaLabel(): string;
    /**
     * @param containsInteractive
     * @type {boolean}
     * @default false
     */
    get containsInteractive(): boolean;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map