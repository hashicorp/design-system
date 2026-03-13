import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsFormRadioField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnChangeFunction = () => {
    console.log('Invoked "yourOnChangeFunction"');
  };

  <template>
    <HdsFormRadioField
      name="data-center-radio"
      @value="SF1"
      {{on "change" this.yourOnChangeFunction}}
      as |F|
    >
      <F.Label>SF1</F.Label>
    </HdsFormRadioField>
  </template>
}
