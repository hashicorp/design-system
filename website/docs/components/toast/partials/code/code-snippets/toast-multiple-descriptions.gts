import Component from '@glimmer/component';

import { HdsToast } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnDismissFunction = () => {
    console.log('Clicked the "dismiss" button in the "toast"!');
  };

  <template>
    <HdsToast @color="success" @onDismiss={{this.yourOnDismissFunction}} as |T|>
      <T.Title>Title here</T.Title>
      <T.Description>First line of description.</T.Description>
      <T.Description>Second line of description.</T.Description>
    </HdsToast>
  </template>
}
