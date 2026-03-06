import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

import { HdsFormTextInputField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked value = '';
  minLength = 30;

  get fieldIsInvalid() {
    return this.value.length > 0 && this.value.length < this.minLength;
  }

  updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
  };

  <template>
    <HdsFormTextInputField
      @value={{this.value}}
      @isInvalid={{this.fieldIsInvalid}}
      {{on "input" this.updateValue}}
      name="demo-cluster-name"
      as |F|
    >
      <F.Label>Cluster name</F.Label>
      <F.CharacterCount @minLength={{this.minLength}} />
      {{#if this.fieldIsInvalid}}
        <F.Error>Length should be at least 30 characters</F.Error>
      {{/if}}
    </HdsFormTextInputField>
  </template>
}
