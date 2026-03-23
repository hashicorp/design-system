import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsFormToggleField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnChangeFunction = () => {
    console.log('Invoked "yourOnChangeFunction"');
  };

  <template>
    <HdsFormToggleField
      name="demo-cost-estimate"
      {{on "change" this.yourOnChangeFunction}}
      as |F|
    >
      <F.Label>Enable cost estimation</F.Label>
    </HdsFormToggleField>
  </template>
}
