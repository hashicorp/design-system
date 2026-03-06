import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsFormTextInputBase } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnBlurFunction = () => {
    console.log('Input blurred');
  };

  <template>
    <HdsFormTextInputBase
      @type="email"
      @value="janedoe@email.com"
      aria-label="User email"
      placeholder="eg. name.surname@email.com"
      required={{true}}
      name="demo-email"
      {{on "blur" this.yourOnBlurFunction}}
    />
  </template>
}
