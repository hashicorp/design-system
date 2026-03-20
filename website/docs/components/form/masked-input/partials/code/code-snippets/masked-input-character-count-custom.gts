import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import { HdsFormMaskedInputField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked value = '036215df4996ca649928d8864b4df9e42cba0d';

  updateValue(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
  }

  <template>
    <HdsFormMaskedInputField
      @value={{this.value}}
      name="demo-team-token"
      {{on "input" this.updateValue}}
      as |F|
    >
      <F.Label>Terraform Cloud team token</F.Label>
      <F.CharacterCount @maxLength={{40}} as |CC|>
        {{CC.remaining}}
        characters remaining
      </F.CharacterCount>
    </HdsFormMaskedInputField>
  </template>
}
