/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq } from 'ember-truth-helpers';

import {
  HdsCopyButton,
  HdsFormTextInputField,
  HdsFormTextareaBase,
  HdsFormSelectBase,
} from '@hashicorp/design-system-components/components';

type inputComponent = 'text' | 'textarea' | 'select';

export const INPUT_COMPONENTS: inputComponent[] = [
  'text',
  'textarea',
  'select',
];

export interface CodeFragmentWithHdsInputSignature {
  Args: {
    inputComponent: inputComponent;
    isDisabled?: boolean;
    isReadOnly?: boolean;
  };
  Element: HTMLDivElement;
}

const CodeFragmentWithHdsInput: TemplateOnlyComponent<CodeFragmentWithHdsInputSignature> =
  <template>
    <div class="shw-component-copy-button-flex-container" ...attributes>
      {{#if (eq @inputComponent "text")}}
        <HdsFormTextInputField
          @value="036140285924"
          disabled={{@isDisabled}}
          readonly={{@isReadOnly}}
          @id="test-input-{{@inputComponent}}"
          as |F|
        >
          <F.Label>Input Label</F.Label>
        </HdsFormTextInputField>
      {{else if (eq @inputComponent "textarea")}}
        <HdsFormTextareaBase
          @value="This is a normal
multiline text
that should be copied"
          aria-label="With Textarea::Base"
          disabled={{@isDisabled}}
          readonly={{@isReadOnly}}
          @id="test-input-{{@inputComponent}}"
        />
      {{else if (eq @inputComponent "select")}}
        <HdsFormSelectBase
          disabled={{@isDisabled}}
          readonly={{@isReadOnly}}
          aria-label="Select"
          @id="test-input-{{@inputComponent}}"
          as |C|
        >
          <C.Options>
            <option>Lorem ipsum dolor</option>
            <option selected>Sit amet</option>
            <option>Consectetur adipiscing elit</option>
          </C.Options>
        </HdsFormSelectBase>
      {{/if}}
      <HdsCopyButton
        @text="Copy the input value"
        @targetToCopy="#test-input-{{@inputComponent}}"
        @isIconOnly={{true}}
      />
    </div>
  </template>;

export default CodeFragmentWithHdsInput;
