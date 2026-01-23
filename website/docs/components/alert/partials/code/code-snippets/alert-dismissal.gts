import Component from '@glimmer/component';

import { HdsAlert } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  noop() {
    //
  }

  <template>
    <HdsAlert @type="inline" @color="warning" @onDismiss={{this.noop}} as |A|>
      <A.Title>Title here</A.Title>
      <A.Description>Description here</A.Description>
    </HdsAlert>
  </template>
}
