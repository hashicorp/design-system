import Component from '@glimmer/component';

import { HdsTag } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnDismissFunction = () => {
    console.log('Clicked the "dismiss" button in the "tag"!');
  };

  <template>
    <HdsTag
      @color="primary"
      @text="My link tag"
      @route="show"
      @model="components/tag"
      @onDismiss={{this.yourOnDismissFunction}}
    />
    <HdsTag
      @color="secondary"
      @text="My link tag"
      @route="show"
      @model="components/tag"
      @onDismiss={{this.yourOnDismissFunction}}
    />
  </template>
}
