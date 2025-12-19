import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsButton } from '@hashicorp/design-system-components/components';

export default class ButtonDisabled extends Component {
  alertOnClick = () => {
    alert('Hello from Helios!');
  };

  <template>
    <HdsButton @text="Alert me" disabled {{on "click" this.alertOnClick}} />
  </template>
}
