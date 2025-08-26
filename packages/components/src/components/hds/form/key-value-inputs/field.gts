/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { action } from '@ember/object';
import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
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
import HdsFormMaskedInputBaseComponent from '../masked-input/base.gts';
import HdsFormSelectBaseComponent from '../select/base.gts';
import HdsFormSuperSelectMultipleBaseComponent from '../super-select/multiple/base.gts';
import HdsFormSuperSelectSingleBaseComponent from '../super-select/single/base.gts';
import HdsFormTextInputBaseComponent from '../text-input/base.gts';
import HdsFormTextareaBaseComponent from '../textarea/base.gts';

import { hash } from '@ember/helper';
import type { AriaDescribedByComponent } from '../../../../utils/hds-aria-described-by.ts';
import HdsFormLabel from '../label/index.gts';
import HdsFormHelperText from '../helper-text/index.gts';
import HdsFormFileInputBase from '../file-input/base.gts';
import HdsFormSelectBase from '../select/base.gts';
import HdsFormMaskedInputBase from '../masked-input/base.gts';
import HdsFormSuperSelectSingleBase from '../super-select/single/base.gts';
import { concat } from '@ember/helper';
import HdsFormSuperSelectMultipleBase from '../super-select/multiple/base.gts';
import HdsFormTextInputBase from '../text-input/base.gts';
import HdsFormTextareaBase from '../textarea/base.gts';
import HdsFormError from '../error/index.gts';

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

  <template>
    <div
      class="hds-form-key-value-inputs__field"
      data-width={{@width}}
      ...attributes
      {{this._onInsert}}
    >
      <div class="hds-form-key-value-inputs__field-header">
        {{yield
          (hash
            Label=(component
              HdsFormLabel
              contextualClass="hds-form-key-value-inputs__field-label"
              controlId=this.id
              hiddenText=this.labelHiddenText
              isOptional=@isOptional
              isRequired=@isRequired
            )
          )
        }}
        {{yield
          (hash
            HelperText=(component
              HdsFormHelperText
              contextualClass="hds-form-key-value-inputs__field-helper-text"
              controlId=this.id
              onInsert=this.appendDescriptor
            )
          )
        }}
      </div>
      <div class="hds-form-key-value-inputs__field-control">

        {{! @glint-expect-error - Glint does not recognize 'this.ariaDescribedBy' as defined when used directly in a multi-line hash passed to yield. Since '@glint-expect-error' only applies to the line immediately after it and cannot be placed inside a multi-line hash, we use a 'let' to work around this limitation. }}
        {{#let this.ariaDescribedBy as |ariaDescribedBy|}}
          {{yield
            (hash
              FileInput=(component
                HdsFormFileInputBase ariaDescribedBy=ariaDescribedBy id=this.id
              )
              MaskedInput=(component
                HdsFormMaskedInputBase
                ariaDescribedBy=ariaDescribedBy
                id=this.id
                isInvalid=@isInvalid
              )
              Select=(component
                HdsFormSelectBase
                ariaDescribedBy=ariaDescribedBy
                id=this.id
                isInvalid=@isInvalid
              )
              SuperSelectSingle=(component
                HdsFormSuperSelectSingleBase
                ariaDescribedBy=ariaDescribedBy
                ariaLabelledBy=(concat this.labelIdPrefix this.id)
                isInvalid=@isInvalid
                triggerId=this.id
              )
              SuperSelectMultiple=(component
                HdsFormSuperSelectMultipleBase
                ariaDescribedBy=ariaDescribedBy
                ariaLabelledBy=(concat this.labelIdPrefix this.id)
                isInvalid=@isInvalid
                triggerId=this.id
              )
              TextInput=(component
                HdsFormTextInputBase
                ariaDescribedBy=ariaDescribedBy
                id=this.id
                isInvalid=@isInvalid
              )
              Textarea=(component
                HdsFormTextareaBase
                ariaDescribedBy=ariaDescribedBy
                id=this.id
                isInvalid=@isInvalid
              )
            )
          }}
        {{/let}}

        {{yield
          (hash
            Error=(component
              HdsFormError
              contextualClass="hds-form-key-value-inputs__field-error"
              controlId=this.id
              onInsert=this.appendDescriptor
              onRemove=this.removeDescriptor
            )
          )
        }}
      </div>
    </div>
  </template>
}
