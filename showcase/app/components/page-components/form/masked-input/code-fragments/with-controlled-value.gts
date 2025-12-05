/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import type { ComponentLike } from '@glint/template';

import { HdsFormMaskedInputField } from '@hashicorp/design-system-components/components';
import type { HdsFormCharacterCountSignature } from '@hashicorp/design-system-components/components/hds/form/character-count/index';
import type { HdsFormErrorSignature } from '@hashicorp/design-system-components/components/hds/form/error/index';
import type { HdsFormHelperTextSignature } from '@hashicorp/design-system-components/components/hds/form/helper-text/index';
import type { HdsFormMaskedInputFieldSignature } from '@hashicorp/design-system-components/components/hds/form/masked-input/field';

export interface CodeFragmentWithControlledValueSignature {
  Args: {
    hasCopyButton?: HdsFormMaskedInputFieldSignature['Args']['hasCopyButton'];
    hasValidation?: boolean;
    isMultiline?: HdsFormMaskedInputFieldSignature['Args']['isMultiline'];
    value?: HdsFormMaskedInputFieldSignature['Args']['value'];
  };
  Blocks: {
    default: [
      {
        CharacterCount?: ComponentLike<HdsFormCharacterCountSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithControlledValue extends Component<CodeFragmentWithControlledValueSignature> {
  @tracked value = this.args.value ?? '';
  @tracked isInvalid = true;

  updateValue = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    this.value = value;

    if (this.args.hasValidation) {
      this.isInvalid = value.length > 20;
    }
  };

  get hasValidation() {
    return this.args.hasValidation ?? false;
  }

  <template>
    <HdsFormMaskedInputField
      @value={{this.value}}
      @hasCopyButton={{@hasCopyButton}}
      @isInvalid={{if this.hasValidation this.isInvalid false}}
      @isMultiline={{@isMultiline}}
      {{on "input" this.updateValue}}
      as |F|
    >
      <F.Label>This is the label text</F.Label>
      {{#if this.hasValidation}}
        <F.CharacterCount @maxLength={{20}} />
        {{#if this.isInvalid}}
          <F.Error>Maximum numbers of characters exceeded</F.Error>
        {{/if}}
      {{else}}
        {{yield
          (hash
            CharacterCount=F.CharacterCount
            Error=F.Error
            HelperText=F.HelperText
          )
        }}
      {{/if}}
    </HdsFormMaskedInputField>
  </template>
}
