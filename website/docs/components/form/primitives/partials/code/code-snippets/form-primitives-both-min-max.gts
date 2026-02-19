import Component from '@glimmer/component';

import { HdsFormCharacterCount } from '@hashicorp/design-system-components/components';

import { on } from '@ember/modifier';

import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked value = '';

  updateValue = (event: Event) => {
    this.value = (event?.target as HTMLInputElement)?.value;
  };

  <template>
    {{! template-lint-disable require-input-label }}
    <input
      type="text"
      aria-label="input with min and max length count"
      id="input-character-count-min-max"
      value={{this.value}}
      {{on "input" this.updateValue}}
    />
    <HdsFormCharacterCount
      @minLength={{3}}
      @maxLength={{10}}
      @controlId="input-character-count-min-max"
      @value={{this.value}}
    />
  </template>
}
