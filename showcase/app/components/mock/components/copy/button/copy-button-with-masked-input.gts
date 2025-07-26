import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq } from 'ember-truth-helpers';

import {
  HdsCopyButton,
  HdsFormMaskedInputBase,
  HdsFormField,
  HdsFormMaskedInputField,
} from '@hashicorp/design-system-components/components';

type variant =
  | 'masked-input-base'
  | 'masked-input-base-form-field'
  | 'masked-input-field';

export const MASKED_INPUT_VARIANTS: variant[] = [
  'masked-input-base',
  'masked-input-base-form-field',
  'masked-input-field',
];

export interface CopyButtonWithMaskedInputSignature {
  Args: {
    isMultiline?: boolean;
    variant: variant;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}

const CopyButtonWithMaskedInput: TemplateOnlyComponent<CopyButtonWithMaskedInputSignature> =
  <template>
    {{#if (eq @variant "masked-input-base")}}
      <div class="shw-component-copy-button-composition-masked-input-base">
        <HdsFormMaskedInputBase
          @value="Lorem ipsum dolor"
          aria-label="With MaskedInput::Base"
          @isMultiline={{@isMultiline}}
        />
        <HdsCopyButton
          @isIconOnly={{true}}
          @text="Copy"
          @textToCopy="Lorem ipsum dolor"
        />
      </div>
    {{else if (eq @variant "masked-input-base-form-field")}}
      <HdsFormField @layout="vertical" as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Control>
          <div class="shw-component-copy-button-composition-masked-input-base">
            <HdsFormMaskedInputBase
              @value="Lorem ipsum dolor"
              aria-label="With MaskedInput::Base"
              @isMultiline={{@isMultiline}}
            />
            <HdsCopyButton
              @isIconOnly={{true}}
              @text="Copy"
              @textToCopy="Lorem ipsum dolor"
            />
          </div>
        </F.Control>
      </HdsFormField>
    {{else}}
      <div class="shw-component-copy-button-composition-masked-input-field">
        <HdsFormMaskedInputField
          @value="Lorem ipsum dolor"
          @isMultiline={{@isMultiline}}
          as |F|
        >
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
        </HdsFormMaskedInputField>
        <HdsCopyButton
          @isIconOnly={{true}}
          @text="Copy"
          @textToCopy="Lorem ipsum dolor"
        />
      </div>
    {{/if}}
  </template>;

export default CopyButtonWithMaskedInput;
