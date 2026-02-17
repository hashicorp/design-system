/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { hash, concat } from '@ember/helper';

import type { WithBoundArgs } from '@glint/template';

import {
  ariaDescribedBy,
  registerAriaDescriptionElement,
  unregisterAriaDescriptionElement,
} from '../../../../utils/hds-aria-described-by.ts';
import { getElementId } from '../../../../utils/hds-get-element-id.ts';
import HdsFormError from '../error/index.gts';
import HdsFormFileInputBase from '../file-input/base.gts';
import HdsFormHelperText from '../helper-text/index.gts';
import HdsFormLabel, { ID_PREFIX as LABEL_ID_PREFIX } from '../label/index.gts';
import HdsFormMaskedInputBase from '../masked-input/base.ts';
import HdsFormSelectBase from '../select/base.ts';
import HdsFormSuperSelectMultipleBase from '../super-select/multiple/base.ts';
import HdsFormSuperSelectSingleBase from '../super-select/single/base.ts';
import HdsFormTextareaBase from '../textarea/base.gts';
import HdsFormTextInputBase from '../text-input/base.gts';

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
          typeof HdsFormLabel,
          | 'contextualClass'
          | 'controlId'
          | 'hiddenText'
          | 'isOptional'
          | 'isRequired'
        >;
        HelperText?: WithBoundArgs<
          typeof HdsFormHelperText,
          'contextualClass' | 'controlId' | 'onInsert'
        >;
        FileInput?: WithBoundArgs<
          typeof HdsFormFileInputBase,
          'ariaDescribedBy' | 'id'
        >;
        MaskedInput?: WithBoundArgs<
          typeof HdsFormMaskedInputBase,
          'ariaDescribedBy' | 'id' | 'isInvalid'
        >;
        Select?: WithBoundArgs<
          typeof HdsFormSelectBase,
          'ariaDescribedBy' | 'id' | 'isInvalid'
        >;
        SuperSelectSingle?: WithBoundArgs<
          typeof HdsFormSuperSelectSingleBase,
          'ariaDescribedBy' | 'ariaLabelledBy' | 'isInvalid' | 'triggerId'
        >;
        SuperSelectMultiple?: WithBoundArgs<
          typeof HdsFormSuperSelectMultipleBase,
          'ariaDescribedBy' | 'ariaLabelledBy' | 'isInvalid' | 'triggerId'
        >;
        TextInput?: WithBoundArgs<
          typeof HdsFormTextInputBase,
          'ariaDescribedBy' | 'id' | 'isInvalid'
        >;
        Textarea?: WithBoundArgs<
          typeof HdsFormTextareaBase,
          'ariaDescribedBy' | 'id' | 'isInvalid'
        >;
        Error?: WithBoundArgs<
          typeof HdsFormError,
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

  appendDescriptor = (element: HTMLElement): void => {
    registerAriaDescriptionElement(this as AriaDescribedByComponent, element);
  };

  removeDescriptor = (element: HTMLElement): void => {
    unregisterAriaDescriptionElement(this as AriaDescribedByComponent, element);
  };

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
        {{! @glint-expect-error - Glint does not recognize this.ariaDescribedBy as defined when used directly in a multi-line hash passed to yield. Since @glint-expect-error only applies to the line immediately after it and cannot be placed inside a multi-line hash, we use a let to work around this limitation. }}
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
