/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
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
import HdsFormHelperTextComponent from '../helper-text/index.ts';
import HdsFormErrorComponent from '../error/index.ts';
import type { HdsFormSelectBaseSignature } from '../select/base.ts';
import type { HdsFormFieldSignature } from '../field/index.ts';
import type { HdsFormTextareaBaseSignature } from '../textarea/base.ts';
import type { AriaDescribedByComponent } from '../../../../utils/hds-aria-described-by.ts';
import type { HdsFormTextInputBaseSignature } from '../text-input/base.ts';
import type { HdsFormMaskedInputBaseSignature } from '../masked-input/base.ts';
import HdsFormLabelComponent from '../label/index.ts';
import type { HdsFormSuperSelectSingleBaseSignature } from '../super-select/single/base.ts';
import type { HdsFormSuperSelectMultipleBaseSignature } from '../super-select/multiple/base.ts';
import type { HdsFormFileInputBaseSignature } from '../file-input/base.ts';

export interface HdsFormKeyValuePairFieldSignature {
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
        Select?: ComponentLike<HdsFormSelectBaseSignature>;
        TextInput?: ComponentLike<HdsFormTextInputBaseSignature>;
        Textarea?: ComponentLike<HdsFormTextareaBaseSignature>;
        MaskedInput?: ComponentLike<HdsFormMaskedInputBaseSignature>;
        SuperSelectSingle?: ComponentLike<HdsFormSuperSelectSingleBaseSignature>;
        SuperSelectMultiple?: ComponentLike<HdsFormSuperSelectMultipleBaseSignature>;
        FileInput?: ComponentLike<HdsFormFileInputBaseSignature>;
      },
    ];
  };
  Element: HTMLElement;
}

// @ts-expect-error: decorator function return type 'ClassOf<AriaDescribedBy>' is not assignable to 'typeof HdsFormField'
@ariaDescribedBy
export default class HdsFormKeyValuePairField extends Component<HdsFormKeyValuePairFieldSignature> {
  private _id = guidFor(this);

  constructor(owner: Owner, args: HdsFormKeyValuePairFieldSignature['Args']) {
    super(owner, args);

    registerDestructor(this, (): void => {
      if (this.args.onRemove && this.args.rowIndex === 0) {
        this.args.onRemove(this.element as HTMLDivElement);
      }
    });
  }

  private _onInsert = modifier((element: HTMLDivElement) => {
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
