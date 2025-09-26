import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';
import { hash } from '@ember/helper';

import { HdsFormTextareaField } from '@hashicorp/design-system-components/components';

export interface CodeFragmentWithCharacterCountSignature {
  Args: {
    maxLength: number;
    value: string;
    hasValidation?: boolean;
  };
  Blocks: {
    default: [
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
  }

  updateValue = (event: Event) => {
    const { value } = event.target as HTMLTextAreaElement;
    this.value = value;

    if (this.args.hasValidation) {
      this.isInvalid = value.length > this.args.maxLength;
    }
  };

  <template>
    <HdsFormTextareaField
      @value={{this.value}}
      {{on "input" this.updateValue}}
      as |F|
    >
      <F.Label>This is the label text</F.Label>
      <F.CharacterCount @maxLength={{@maxLength}} as |CC|>
        {{yield (hash currentLength=CC.currentLength maxLength=CC.maxLength)}}
      </F.CharacterCount>
      {{#if this.isInvalid}}
        <F.Error>Maximum numbers of characters exceeded</F.Error>
      {{/if}}
    </HdsFormTextareaField>
  </template>
}
