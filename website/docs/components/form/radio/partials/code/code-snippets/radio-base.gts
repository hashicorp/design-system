import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsFormRadioBase } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnChangeFunction = () => {
    console.log('Invoked "yourOnChangeFunction"');
  };

  <template>
    <HdsFormRadioBase
      name="data-center-radio2"
      aria-label="San Francisco datacenter number 1"
      @value="SF1"
      {{on "change" this.yourOnChangeFunction}}
    />
  </template>
}
