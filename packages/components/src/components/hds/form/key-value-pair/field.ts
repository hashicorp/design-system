/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

import {
  ariaDescribedBy,
  registerAriaDescriptionElement,
  unregisterAriaDescriptionElement,
} from '../../../../utils/hds-aria-described-by.ts';
import HdsFormLabelComponent from '../label/index.ts';
import HdsFormHelperTextComponent from '../helper-text/index.ts';
import HdsFormErrorComponent from '../error/index.ts';
import type { HdsYieldSignature } from '../../yield/index.ts';
import type { HdsFormSelectBaseSignature } from '../select/base.ts';
import type { HdsFormFieldSignature } from '../field/index.ts';
import type {HdsFormKeyValuePairTextInputSignature} from './text-input.ts';
import type { AriaDescribedByComponent } from '../../../../utils/hds-aria-described-by.ts';
import type {HdsFormTextInputBaseSignature} from '../text-input/base.ts';

export interface HdsFormKeyValuePairFieldSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'> & {
    rowIndex: number;
    isInvalid?: boolean;
  };
  Blocks: {
    default?: [
      {
        Label?: WithBoundArgs<
          typeof HdsFormLabelComponent,
          'contextualClass' | 'controlId' | 'isRequired' | 'isOptional'
        >;
        HelperText?: WithBoundArgs<
          typeof HdsFormHelperTextComponent,
          'contextualClass' | 'controlId' | 'onInsert'
        >;
        Error?: WithBoundArgs<
          typeof HdsFormErrorComponent,
          'contextualClass' | 'controlId' | 'onInsert' | 'onRemove'
        >;
        Generic?: ComponentLike<HdsYieldSignature>;
        Select?: ComponentLike<HdsFormSelectBaseSignature>;
        TextInput?: ComponentLike<HdsFormKeyValuePairTextInputSignature>;
         TextInputBase?: ComponentLike<HdsFormTextInputBaseSignature>;
        id?: string;
        ariaDescribedBy?: string;
      },
    ];
  };
  Element: HTMLElement;
}

// @ts-expect-error: decorator function return type 'ClassOf<AriaDescribedBy>' is not assignable to 'typeof HdsFormField'
@ariaDescribedBy
export default class HdsFormKeyValuePairField extends Component<HdsFormKeyValuePairFieldSignature> {
  private _id = guidFor(this);

    @action
    appendDescriptor(element: HTMLElement): void {
      registerAriaDescriptionElement(this as AriaDescribedByComponent, element);
    }
  
    @action removeDescriptor(element: HTMLElement): void {
      unregisterAriaDescriptionElement(this as AriaDescribedByComponent, element);
    }
}
