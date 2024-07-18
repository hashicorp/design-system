/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export declare const ID_PREFIX = "label-";
import type { HdsFormIndicatorSignature } from '../indicator';
export interface HdsFormLabelSignature {
    Args: {
        contextualClass?: string;
        controlId?: string;
        isOptional?: HdsFormIndicatorSignature['Args']['isOptional'];
        isRequired?: HdsFormIndicatorSignature['Args']['isRequired'];
    };
    Blocks: {
        default: [];
    };
    Element: HTMLLabelElement;
}
export default class HdsFormLabelComponent extends Component<HdsFormLabelSignature> {
    /**
     * Determines the unique ID to assign to the element
     * @method id
     * @return {(string|null)} The "id" attribute to apply to the element or null, if no controlId is provided
     */
    get id(): string | null;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map