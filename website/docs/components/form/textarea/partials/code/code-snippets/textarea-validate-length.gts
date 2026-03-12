import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import { HdsFormTextareaField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked value = 'This is my description';
  @tracked minLength = 100;

  get fieldIsInvalid(): boolean {
    return this.value.length < this.minLength;
  }

  updateValue = (event: Event) => {
    this.value = (event.target as HTMLTextAreaElement).value;
  };

  <template>
    <HdsFormTextareaField
      @value={{this.value}}
      @isInvalid={{this.fieldIsInvalid}}
      name="demo-description"
      {{on "input" this.updateValue}}
      as |F|
    >
      <F.Label>Short description</F.Label>
      <F.CharacterCount @minLength={{this.minLength}} />
      {{#if this.fieldIsInvalid}}
        <F.Error>Length should be at least 100 characters</F.Error>
      {{/if}}
    </HdsFormTextareaField>
  </template>
}
