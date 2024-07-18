/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsFormTextareaBaseSignature {
    Args: {
        isInvalid?: boolean;
        value?: string;
        width?: string;
        height?: string;
    };
    Element: HTMLElement;
}
export default class HdsFormTextareaBaseComponent extends Component<HdsFormTextareaBaseSignature> {
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=base.d.ts.map