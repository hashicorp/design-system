import Component from '@glimmer/component';

import { HdsTag } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnDismissFunction = () => {
    console.log('Clicked the "dismiss" button in the "tag"!');
  };

  <template>
    <HdsTag @text="My text tag" @onDismiss={{this.yourOnDismissFunction}} />
  </template>
}
