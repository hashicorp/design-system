/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import HdsFormErrorComponent from '../error/index.ts';
import HdsFormFileInputBaseComponent from '../file-input/base.ts';
import HdsFormHelperTextComponent from '../helper-text/index.ts';
import HdsFormLabelComponent from '../label/index.ts';
import HdsFormMaskedInputBaseComponent from '../masked-input/base.ts';
import HdsFormSelectBaseComponent from '../select/base.ts';
import HdsFormSuperSelectMultipleBaseComponent from '../super-select/multiple/base.ts';
import HdsFormSuperSelectSingleBaseComponent from '../super-select/single/base.ts';
import HdsFormTextareaBaseComponent from '../textarea/base.ts';
import HdsFormTextInputBaseComponent from '../text-input/base.ts';
export interface HdsFormKeyValueInputsFieldSignature {
    Args: {
        extraAriaDescribedBy?: string;
        id?: string;
        isInvalid?: boolean;
        isOptional?: boolean;
        isRequired?: boolean;
        onInsert?: () => void;
        onRemove?: () => void;
        rowIndex: number;
        width?: string;
    };
    Blocks: {
        default?: [
            {
                Label?: WithBoundArgs<typeof HdsFormLabelComponent, 'contextualClass' | 'controlId' | 'hiddenText' | 'isOptional' | 'isRequired'>;
                HelperText?: WithBoundArgs<typeof HdsFormHelperTextComponent, 'contextualClass' | 'controlId' | 'onInsert'>;
                FileInput?: WithBoundArgs<typeof HdsFormFileInputBaseComponent, 'ariaDescribedBy' | 'id'>;
                MaskedInput?: WithBoundArgs<typeof HdsFormMaskedInputBaseComponent, 'ariaDescribedBy' | 'id' | 'isInvalid'>;
                Select?: WithBoundArgs<typeof HdsFormSelectBaseComponent, 'ariaDescribedBy' | 'id' | 'isInvalid'>;
                SuperSelectSingle?: WithBoundArgs<typeof HdsFormSuperSelectSingleBaseComponent, 'ariaDescribedBy' | 'ariaLabelledBy' | 'isInvalid' | 'triggerId'>;
                SuperSelectMultiple?: WithBoundArgs<typeof HdsFormSuperSelectMultipleBaseComponent, 'ariaDescribedBy' | 'ariaLabelledBy' | 'isInvalid' | 'triggerId'>;
                TextInput?: WithBoundArgs<typeof HdsFormTextInputBaseComponent, 'ariaDescribedBy' | 'id' | 'isInvalid'>;
                Textarea?: WithBoundArgs<typeof HdsFormTextareaBaseComponent, 'ariaDescribedBy' | 'id' | 'isInvalid'>;
                Error?: WithBoundArgs<typeof HdsFormErrorComponent, 'contextualClass' | 'controlId' | 'onInsert' | 'onRemove'>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsFormKeyValueInputsField extends Component<HdsFormKeyValueInputsFieldSignature> {
    private _onInsert;
    get id(): string;
    get labelHiddenText(): string;
    get labelIdPrefix(): string;
    appendDescriptor(element: HTMLElement): void;
    removeDescriptor(element: HTMLElement): void;
}
