/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsAccordionSizes } from '../types.ts';
interface HdsAccordionItemButtonSignature {
    Args: {
        ariaLabel?: string;
        contentId?: string;
        isOpen?: boolean;
        onClickToggle?: (event: MouseEvent, ...args: any[]) => void;
        parentContainsInteractive?: boolean;
        size?: HdsAccordionSizes;
    };
    Element: HTMLButtonElement;
}
export default class HdsAccordionItemButtonComponent extends Component<HdsAccordionItemButtonSignature> {
    onClick(event: MouseEvent): void;
    /**
     * Get the class names to apply to the component.
     * @method ItemButton#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
export {};
//# sourceMappingURL=button.d.ts.map