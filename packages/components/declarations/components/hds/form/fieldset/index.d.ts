/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import HdsFormLegendComponent from '../legend/index.ts';
import HdsFormHelperTextComponent from '../helper-text/index.ts';
import HdsFormErrorComponent from '../error/index.ts';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type { HdsFormFieldsetLayouts } from './types.ts';
import type { HdsYieldSignature } from '../../yield/index.ts';
export interface HdsFormFieldsetSignature {
    Args: {
        isOptional?: boolean;
        isRequired?: boolean;
        layout?: HdsFormFieldsetLayouts;
    };
    Blocks: {
        default: [
            {
                Legend?: WithBoundArgs<typeof HdsFormLegendComponent, 'contextualClass' | 'isRequired' | 'isOptional'>;
                HelperText?: WithBoundArgs<typeof HdsFormHelperTextComponent, 'contextualClass' | 'controlId' | 'onInsert'>;
                Control?: ComponentLike<HdsYieldSignature>;
                Error?: WithBoundArgs<typeof HdsFormErrorComponent, 'contextualClass' | 'controlId' | 'onInsert' | 'onRemove'>;
                id?: string;
                ariaDescribedBy?: string;
            }
        ];
    };
    Element: HTMLElement;
}
declare class HdsFormFieldsetComponent extends Component<HdsFormFieldsetSignature> {
    /**
     * Sets the layout of the group
     *
     * @param layout
     * @type {enum}
     * @default 'vertical'
     */
    get layout(): HdsFormFieldsetLayouts;
    /**
     * Calculates the unique ID to assign to the fieldset
     */
    get id(): string;
    /**
     * @param isRequired
     * @type {boolean}
     * @default false
     */
    get isRequired(): boolean;
    /**
     * @param isOptional
     * @type {boolean}
     * @default false
     */
    get isOptional(): boolean;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
    appendDescriptor(element: HTMLElement): void;
    removeDescriptor(element: HTMLElement): void;
}
export default HdsFormFieldsetComponent;
//# sourceMappingURL=index.d.ts.map