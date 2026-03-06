import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import { HdsFormTextareaField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked value = 'This is my description';

  updateValue = (event: Event) => {
    this.value = (event.target as HTMLTextAreaElement).value;
  };

  <template>
    <HdsFormTextareaField
      @value={{this.value}}
      name="demo-description"
      {{on "input" this.updateValue}}
      as |F|
    >
      <F.Label>Short description</F.Label>
      <F.CharacterCount @minLength={{100}} @maxLength={{200}} />
    </HdsFormTextareaField>
  </template>
}
