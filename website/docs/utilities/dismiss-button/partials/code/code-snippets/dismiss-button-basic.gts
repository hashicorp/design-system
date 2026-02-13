import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsDismissButton } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  onClickDismissButton = () => {
    console.log('`Hds::DismissButton` clicked');
  };

  <template>
    <HdsDismissButton {{on "click" this.onClickDismissButton}} />
  </template>
}
