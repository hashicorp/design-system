import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsButton } from '@hashicorp/design-system-components/components';
import type { HdsButtonSignature } from '@hashicorp/design-system-components/components/hds/button/index';

interface ButtonDisabledSignature {
  Element: HdsButtonSignature['Element'];
}

export default class ButtonDisabled extends Component<ButtonDisabledSignature> {
  alertOnClick = () => {
    alert('Hello from Helios!');
  };

  <template>
    <HdsButton
      @text="Alert me"
      disabled
      {{on "click" this.alertOnClick}}
      ...attributes
    />
  </template>
}
