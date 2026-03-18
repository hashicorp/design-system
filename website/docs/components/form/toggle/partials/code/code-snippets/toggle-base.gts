import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsFormToggleBase } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnChangeFunction = () => {
    console.log('Invoked "yourOnChangeFunction"');
  };

  <template>
    <HdsFormToggleBase
      name="demo-cost-estimate"
      aria-label="Enable cost estimation"
      @value="enable"
      {{on "change" this.yourOnChangeFunction}}
    />
  </template>
}
