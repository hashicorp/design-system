import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsFormTextInputField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnBlurFunction = () => {
    console.log('Input blurred');
  };

  <template>
    <HdsFormTextInputField
      @type="email"
      placeholder="eg. name.surname@email.com"
      name="demo-email"
      {{on "blur" this.yourOnBlurFunction}}
      as |F|
    >
      <F.Label>Email</F.Label>
    </HdsFormTextInputField>
  </template>
}
