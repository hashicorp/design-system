/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsIconSignature } from '../../icon';
import type { HdsInteractiveSignature } from '../../interactive';
export interface HdsDropdownListItemCheckmarkSignature {
    Args: HdsInteractiveSignature['Args'] & {
        count?: string | number;
        icon?: HdsIconSignature['Args']['name'];
        selected?: boolean;
    };
    Blocks: {
        default: [];
    };
    Element: HdsInteractiveSignature['Element'];
}
export default class HdsDropdownListItemCheckmark extends Component<HdsDropdownListItemCheckmarkSignature> {
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=checkmark.d.ts.map