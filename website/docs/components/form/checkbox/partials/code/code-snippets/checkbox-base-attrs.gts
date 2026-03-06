import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsFormCheckboxBase } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnChangeFunction = () => {
    console.log('Invoked "yourOnChangeFunction"');
  };

  <template>
    <HdsFormCheckboxBase
      name="demo-cost-estimation"
      aria-label="Enable cost estimation"
      @value="enable"
      {{on "change" this.yourOnChangeFunction}}
    />
  </template>
}
