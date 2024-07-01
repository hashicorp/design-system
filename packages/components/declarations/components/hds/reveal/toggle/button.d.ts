/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsButtonSignature } from '../../button/';
export interface HdsRevealToggleButtonSignature {
    Args: {
        text: string;
        isOpen?: boolean;
    };
    Element: HdsButtonSignature['Element'];
}
export default class HdsRevealToggleButtonComponent extends Component<HdsRevealToggleButtonSignature> {
    /**
     * Get the class names to apply to the component.
     * @method ToggleButton#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=button.d.ts.map