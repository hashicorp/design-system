/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { registerDestructor } from '@ember/destroyable';
import type Owner from '@ember/owner';
import { modifier } from 'ember-modifier';

import {
  ariaDescribedBy,
  registerAriaDescriptionElement,
  unregisterAriaDescriptionElement,
} from '../../../../utils/hds-aria-described-by.ts';
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

import type { HdsFormFieldSignature } from '../field/index.ts';
import type { AriaDescribedByComponent } from '../../../../utils/hds-aria-described-by.ts';

export interface HdsFormKeyValueInputsFieldSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'> & {
    rowIndex: number;
    isInvalid?: boolean;
    onInsert?: (element: HTMLDivElement) => void;
    onRemove?: (element: HTMLDivElement) => void;
    width?: string;
  };
  Blocks: {
    default?: [
      {
        Label?: WithBoundArgs<
          typeof HdsFormLabelComponent,
          | 'contextualClass'
          | 'controlId'
          | 'isRequired'
          | 'isOptional'
          | 'hiddenText'
        >;
        HelperText?: WithBoundArgs<
          typeof HdsFormHelperTextComponent,
          'contextualClass' | 'controlId' | 'onInsert'
        >;
        Error?: WithBoundArgs<
          typeof HdsFormErrorComponent,
          'contextualClass' | 'controlId' | 'onInsert' | 'onRemove'
        >;
        Select?: WithBoundArgs<
          typeof HdsFormSelectBaseComponent,
          'isInvalid' | 'id' | 'ariaDescribedBy'
        >;
        FileInput?: WithBoundArgs<
          typeof HdsFormFileInputBaseComponent,
          'id' | 'ariaDescribedBy'
        >;
        MaskedInput?: WithBoundArgs<
          typeof HdsFormMaskedInputBaseComponent,
          'id' | 'ariaDescribedBy' | 'isInvalid'
        >;
        SuperSelectSingle?: WithBoundArgs<
          typeof HdsFormSuperSelectSingleBaseComponent,
          'triggerId' | 'ariaDescribedBy' | 'isInvalid'
        >;
        SuperSelectMultiple?: WithBoundArgs<
          typeof HdsFormSuperSelectMultipleBaseComponent,
          'triggerId' | 'ariaDescribedBy' | 'isInvalid'
        >;
        TextInput?: WithBoundArgs<
          typeof HdsFormTextInputBaseComponent,
          'id' | 'ariaDescribedBy' | 'isInvalid'
        >;
        Textarea?: WithBoundArgs<
          typeof HdsFormTextareaBaseComponent,
          'id' | 'ariaDescribedBy' | 'isInvalid'
        >;
      },
    ];
  };
  Element: HTMLElement;
}

// @ts-expect-error: decorator function return type 'ClassOf<AriaDescribedBy>' is not assignable to 'typeof HdsFormField'
@ariaDescribedBy
export default class HdsFormKeyValueInputsField extends Component<HdsFormKeyValueInputsFieldSignature> {
  private _id = guidFor(this);
  private _element!: HTMLDivElement;

  constructor(owner: Owner, args: HdsFormKeyValueInputsFieldSignature['Args']) {
    super(owner, args);

    registerDestructor(this, (): void => {
      if (this.args.onRemove && this.args.rowIndex === 0) {
        this.args.onRemove(this._element);
      }
    });
  }

  private _onInsert = modifier((element: HTMLDivElement) => {
    this._element = element;
    if (this.args.onInsert && this.args.rowIndex === 0) {
      this.args.onInsert(element);
    }
  });

  get labelHiddenText(): string {
    return `row ${this.args.rowIndex + 1}`;
  }

  @action
  appendDescriptor(element: HTMLElement): void {
    registerAriaDescriptionElement(this as AriaDescribedByComponent, element);
  }

  @action removeDescriptor(element: HTMLElement): void {
    unregisterAriaDescriptionElement(this as AriaDescribedByComponent, element);
  }
}
