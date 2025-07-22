import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq } from 'ember-truth-helpers';

import {
  HdsCopyButton,
  HdsFormTextInputField,
  HdsFormTextareaBase,
  HdsFormSelectBase,
} from '@hashicorp/design-system-components/components';

type inputComponent = 'text' | 'textarea' | 'select';

export const HDS_INPUT_COMPONENTS: inputComponent[] = [
  'text',
  'textarea',
  'select',
];

export interface CopyButtonTargetsHdsInputSignature {
  Args: {
    inputComponent: inputComponent;
    isDisabled?: boolean;
    isReadOnly?: boolean;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

const CopyButtonTargetsHdsInput: TemplateOnlyComponent<CopyButtonTargetsHdsInputsSignature> =
  <template>
    <div class="shw-component-copy-button-flex-container">
      {{#if (eq @inputComponent "text")}}
        <HdsFormTextInputField
          @value="036140285924"
          disabled={{@isDisabled}}
          readonly={{@isReadOnly}}
          @id="test-input"
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
          id="test-input"
        />
      {{else if (eq @inputComponent "select")}}
        <HdsFormSelectBase
          disabled={{@isDisabled}}
          readonly={{@isReadOnly}}
          aria-label="Select"
          id="test-input"
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
        @targetToCopy="#test-input"
        @isIconOnly={{true}}
      />
    </div>
  </template>;

export default CopyButtonTargetsHdsInput;
