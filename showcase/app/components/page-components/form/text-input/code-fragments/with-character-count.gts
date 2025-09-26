import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';
import { hash } from '@ember/helper';

import { HdsFormTextInputField } from '@hashicorp/design-system-components/components';

export interface CodeFragmentWithCharacterCountSignature {
  Args: {
    maxLength: number;
    value: string;
    hasValidation?: boolean;
    hasHelperText?: boolean;
  };
  Blocks: {
    characterCount: [
      {
        currentLength?: number;
        maxLength?: number;
      },
    ];
  };
}

export default class CodeFragmentWithCharacterCount extends Component<CodeFragmentWithCharacterCountSignature> {
  @tracked value = '';
  @tracked isInvalid = false;

  constructor(
    owner: Owner,
    args: CodeFragmentWithCharacterCountSignature['Args'],
  ) {
    super(owner, args);
    this.value = args.value ?? '';
    this.validateValue();
  }

  updateValue = (event: Event) => {
    const { value } = event.target as HTMLTextAreaElement;
    this.value = value;

    this.validateValue();
  };

  validateValue = () => {
    if (this.args.hasValidation) {
      this.isInvalid = this.value.length > this.args.maxLength;
    }
  };

  <template>
    <HdsFormTextInputField
      @value={{this.value}}
      {{on "input" this.updateValue}}
      as |F|
    >
      <F.Label>This is the label text</F.Label>
      {{#if @hasHelperText}}
        <F.HelperText>This is the helper text</F.HelperText>
      {{/if}}
      {{#if (has-block "characterCount")}}
        <F.CharacterCount @maxLength={{@maxLength}} as |CC|>
          {{yield
            (hash currentLength=CC.currentLength maxLength=CC.maxLength)
            to="characterCount"
          }}
        </F.CharacterCount>
      {{else}}
        <F.CharacterCount @maxLength={{@maxLength}} />
      {{/if}}
      {{#if this.isInvalid}}
        <F.Error>Maximum numbers of characters exceeded</F.Error>
      {{/if}}
    </HdsFormTextInputField>
  </template>
}
