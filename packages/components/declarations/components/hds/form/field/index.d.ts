/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsFormFieldLayoutValues } from './types.ts';
import HdsFormLabelComponent from '../label/index.ts';
import HdsFormHelperTextComponent from '../helper-text/index.ts';
import HdsFormCharacterCountComponent from '../character-count/index.ts';
import HdsFormErrorComponent from '../error/index.ts';
import type { HdsFormFieldLayouts } from './types.ts';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type { HdsYieldSignature } from '../../yield/index.ts';
export declare const LAYOUT_TYPES: HdsFormFieldLayoutValues[];
export interface HdsFormFieldSignature {
    Args: {
        id?: string;
        extraAriaDescribedBy?: string;
        contextualClass?: string;
        isOptional?: boolean;
        isRequired?: boolean;
        layout?: HdsFormFieldLayouts;
    };
    Blocks: {
        default: [
            {
                Label?: WithBoundArgs<typeof HdsFormLabelComponent, 'contextualClass' | 'controlId' | 'isRequired' | 'isOptional'>;
                HelperText?: WithBoundArgs<typeof HdsFormHelperTextComponent, 'contextualClass' | 'controlId' | 'onInsert'>;
                Control?: ComponentLike<HdsYieldSignature>;
                CharacterCount?: WithBoundArgs<typeof HdsFormCharacterCountComponent, 'contextualClass' | 'controlId' | 'onInsert'>;
                Error?: WithBoundArgs<typeof HdsFormErrorComponent, 'contextualClass' | 'controlId' | 'onInsert' | 'onRemove'>;
                id?: string;
                ariaDescribedBy?: string;
            }
        ];
    };
    Element: HTMLElement;
}
declare class HdsFormFieldComponent extends Component<HdsFormFieldSignature> {
    /**
     * Sets the layout of the field
     *
     * @param layout
     * @type {string}
     */
    get layout(): HdsFormFieldLayouts | undefined;
    /**
     * Calculates the unique ID to assign to the form control
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
export default HdsFormFieldComponent;
//# sourceMappingURL=index.d.ts.map