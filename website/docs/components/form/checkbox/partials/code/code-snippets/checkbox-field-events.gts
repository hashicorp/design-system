import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsFormCheckboxField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnChangeFunction = () => {
    console.log('Invoked "yourOnChangeFunction"');
  };

  <template>
    <HdsFormCheckboxField
      name="demo-cost-estimation"
      {{on "change" this.yourOnChangeFunction}}
      as |F|
    >
      <F.Label>Enable cost estimation</F.Label>
    </HdsFormCheckboxField>
  </template>
}
