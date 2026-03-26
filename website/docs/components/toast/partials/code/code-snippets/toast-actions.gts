import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsToast } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnDismissFunction = () => {
    console.log('Clicked the "dismiss" button in the "toast"!');
  };

  yourOnClickFunction = () => {
    console.log('Clicked the button in the "toast"!');
  };

  <template>
    <HdsToast
      @color="critical"
      @onDismiss={{this.yourOnDismissFunction}}
      as |T|
    >
      <T.Title>Title here</T.Title>
      <T.Description>Description here</T.Description>
      <T.Button
        @text="Your action"
        @color="secondary"
        {{on "click" this.yourOnClickFunction}}
      />
      <T.LinkStandalone
        @color="secondary"
        @icon="plus"
        @text="Another action"
        @route="components"
      />
    </HdsToast>
  </template>
}
