/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';

import {
  ariaDescribedBy,
  registerAriaDescriptionElement,
  unregisterAriaDescriptionElement,
} from '../../../../utils/hds-aria-described-by.ts';
import { getElementId } from '../../../../utils/hds-get-element-id.ts';
import HdsFormErrorComponent from '../error/index.gts';
import HdsFormFileInputBaseComponent from '../file-input/base.gts';
import HdsFormHelperTextComponent from '../helper-text/index.gts';
import HdsFormLabelComponent, {
  ID_PREFIX as LABEL_ID_PREFIX,
} from '../label/index.gts';
import HdsFormMaskedInputBaseComponent from '../masked-input/base.ts';
import HdsFormSelectBaseComponent from '../select/base.ts';
import HdsFormSuperSelectMultipleBaseComponent from '../super-select/multiple/base.ts';
import HdsFormSuperSelectSingleBaseComponent from '../super-select/single/base.ts';
import HdsFormTextareaBaseComponent from '../textarea/base.ts';
import HdsFormTextInputBaseComponent from '../text-input/base.ts';

import type { AriaDescribedByComponent } from '../../../../utils/hds-aria-described-by.ts';

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
        Label?: WithBoundArgs<
          typeof HdsFormLabelComponent,
          | 'contextualClass'
          | 'controlId'
          | 'hiddenText'
          | 'isOptional'
          | 'isRequired'
        >;
        HelperText?: WithBoundArgs<
          typeof HdsFormHelperTextComponent,
          'contextualClass' | 'controlId' | 'onInsert'
        >;
        FileInput?: WithBoundArgs<
          typeof HdsFormFileInputBaseComponent,
          'ariaDescribedBy' | 'id'
        >;
        MaskedInput?: WithBoundArgs<
          typeof HdsFormMaskedInputBaseComponent,
          'ariaDescribedBy' | 'id' | 'isInvalid'
        >;
        Select?: WithBoundArgs<
          typeof HdsFormSelectBaseComponent,
          'ariaDescribedBy' | 'id' | 'isInvalid'
        >;
        SuperSelectSingle?: WithBoundArgs<
          typeof HdsFormSuperSelectSingleBaseComponent,
          'ariaDescribedBy' | 'ariaLabelledBy' | 'isInvalid' | 'triggerId'
        >;
        SuperSelectMultiple?: WithBoundArgs<
          typeof HdsFormSuperSelectMultipleBaseComponent,
          'ariaDescribedBy' | 'ariaLabelledBy' | 'isInvalid' | 'triggerId'
        >;
        TextInput?: WithBoundArgs<
          typeof HdsFormTextInputBaseComponent,
          'ariaDescribedBy' | 'id' | 'isInvalid'
        >;
        Textarea?: WithBoundArgs<
          typeof HdsFormTextareaBaseComponent,
          'ariaDescribedBy' | 'id' | 'isInvalid'
        >;
        Error?: WithBoundArgs<
          typeof HdsFormErrorComponent,
          'contextualClass' | 'controlId' | 'onInsert' | 'onRemove'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}

// @ts-expect-error: decorator function return type 'ClassOf<AriaDescribedBy>' is not assignable to 'typeof HdsFormField'
@ariaDescribedBy
export default class HdsFormKeyValueInputsField extends Component<HdsFormKeyValueInputsFieldSignature> {
  private _onInsert = modifier(() => {
    if (this.args.onInsert) {
      this.args.onInsert();
    }

    return () => {
      if (this.args.onRemove) {
        this.args.onRemove();
      }
    };
  });

  get id(): string {
    return getElementId(this);
  }

  get labelHiddenText(): string {
    return `row ${this.args.rowIndex + 1}`;
  }

  get labelIdPrefix(): string {
    return LABEL_ID_PREFIX;
  }

  @action
  appendDescriptor(element: HTMLElement): void {
    registerAriaDescriptionElement(this as AriaDescribedByComponent, element);
  }

  @action
  removeDescriptor(element: HTMLElement): void {
    unregisterAriaDescriptionElement(this as AriaDescribedByComponent, element);
  }
}
