import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsButton } from '@hashicorp/design-system-components/components';
import type { HdsButtonSignature } from '@hashicorp/design-system-components/components/hds/button/index';

interface ButtonActionSignature {
  Element: HdsButtonSignature['Element'];
}

export default class ButtonAction extends Component<ButtonActionSignature> {
  alertOnClick = () => {
    alert('Hello from Helios!');
  };

  <template>
    <HdsButton @text="Alert me" {{on "click" this.alertOnClick}} />
  </template>
}
