import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsDropdownListItemInteractive } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  myAction = () => {
    console.log('Action triggered');
  };

  <template>
    <ul class="hds-dropdown__list">
      <HdsDropdownListItemInteractive {{on "click" this.myAction}} as |I|>
        Run command
        <I.Badge @text="Badge" />
      </HdsDropdownListItemInteractive>
    </ul>
  </template>
}
