/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsFormIndicatorSignature } from '../indicator';
export interface HdsFormLegendSignature {
    Args: {
        contextualClass?: string;
        isOptional?: HdsFormIndicatorSignature['Args']['isOptional'];
        isRequired?: HdsFormIndicatorSignature['Args']['isRequired'];
    };
    Blocks: {
        default: [];
    };
    Element: HTMLLegendElement;
}
export default class HdsFormLegendComponent extends Component<HdsFormLegendSignature> {
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map