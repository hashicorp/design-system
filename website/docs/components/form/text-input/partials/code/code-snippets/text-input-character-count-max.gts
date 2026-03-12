import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

import { HdsFormTextInputField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked value = 'my-cluster-1234';

  updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
  };

  <template>
    <HdsFormTextInputField
      @value={{this.value}}
      name="demo-cluster-name"
      {{on "input" this.updateValue}}
      as |F|
    >
      <F.Label>Cluster name</F.Label>
      <F.CharacterCount @maxLength={{30}} />
    </HdsFormTextInputField>
  </template>
}
