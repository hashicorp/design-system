/**
 * Copyright (c) HashiCorp, Inc.
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

export interface CodeFragmentWithExternalControlSignature {
  Args: {
    handleValidation?: (event: Event) => void;
    hasCopyButton?: HdsFormMaskedInputFieldSignature['Args']['hasCopyButton'];
    isInvalid?: HdsFormMaskedInputFieldSignature['Args']['isInvalid'];
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

export default class CodeFragmentWithExternalControl extends Component<CodeFragmentWithExternalControlSignature> {
  @tracked value = this.args.value ?? '';

  updateValue = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    this.value = value;

    this.args.handleValidation?.(event);
  };

  <template>
    <HdsFormMaskedInputField
      @value={{this.value}}
      @hasCopyButton={{@hasCopyButton}}
      @isInvalid={{@isInvalid}}
      @isMultiline={{@isMultiline}}
      {{on "input" this.updateValue}}
      as |F|
    >
      <F.Label>This is the label text</F.Label>
      {{yield
        (hash
          CharacterCount=F.CharacterCount Error=F.Error HelperText=F.HelperText
        )
      }}
    </HdsFormMaskedInputField>
  </template>
}
