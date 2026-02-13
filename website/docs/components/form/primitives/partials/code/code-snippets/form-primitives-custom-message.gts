import Component from '@glimmer/component';

import { HdsFormCharacterCount } from '@hashicorp/design-system-components/components';

import { tracked } from '@glimmer/tracking';

import { on } from '@ember/modifier';

export default class LocalComponent extends Component {
  @tracked value = '';

  updateValue = (event: Event) => {
    this.value = (event?.target as HTMLInputElement)?.value;
  };

  <template>
    {{! TODO: Fix }}
    {{! template-lint-disable require-input-label }}
    <input
      type="text"
      aria-label="input with min and max length count"
      id="input-character-count-custom"
      value={{this.value}}
      {{on "input" this.updateValue}}
    />
    <HdsFormCharacterCount
      @maxLength={{20}}
      @controlId="input-character-count-custom"
      @value={{this.value}}
      as |CC|
    >
      {{CC.remaining}}
      characters remaining
    </HdsFormCharacterCount>
  </template>
}
