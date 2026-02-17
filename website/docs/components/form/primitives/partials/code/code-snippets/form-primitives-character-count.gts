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
    {{! template-lint-disable require-input-label }}
    <input
      type="text"
      aria-label="input with default character count"
      id="input-character-count-default"
      value={{this.value}}
      {{on "input" this.updateValue}}
    />
    <HdsFormCharacterCount
      @controlId="input-character-count-default"
      @value={{this.value}}
    />
  </template>
}
