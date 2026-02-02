import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsAlert } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnClickFunction = () => {
    console.log('Clicked the button in the "alert"!');
  };

  <template>
    <HdsAlert @type="inline" as |A|>
      <A.Title>Title here</A.Title>
      <A.Description>Description here</A.Description>
      <A.Button
        @text="Your action"
        @color="secondary"
        {{on "click" this.yourOnClickFunction}}
      />
      <A.LinkStandalone
        @color="secondary"
        @icon="arrow-right"
        @iconPosition="trailing"
        @text="Another action"
        @href="#"
      />
    </HdsAlert>
  </template>
}
