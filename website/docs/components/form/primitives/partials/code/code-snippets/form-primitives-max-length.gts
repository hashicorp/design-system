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
      aria-label="input with max length count"
      id="input-character-count-max"
      value={{this.value}}
      {{on "input" this.updateValue}}
    />
    <HdsFormCharacterCount
      @maxLength={{10}}
      @controlId="input-character-count-max"
      @value={{this.value}}
    />
  </template>
}
