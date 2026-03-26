import Component from '@glimmer/component';
import { LinkTo } from '@ember/routing';

import { HdsToast } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnDismissFunction = () => {
    console.log('Clicked the "dismiss" button in the "toast"!');
  };

  <template>
    <HdsToast @color="success" @onDismiss={{this.yourOnDismissFunction}} as |T|>
      <T.Title>Title here</T.Title>
      <T.Description>
        The description can contain
        {{#if true}}conditional logic{{/if}}, Ember components, and HTML tags,
        like
        <strong>strong text</strong>,
        <em>emphasized text</em>,
        <code>code</code>,
        <pre>pre</pre>,
        <a href="#">inline</a>
        <LinkTo @route="index">links</LinkTo>.
      </T.Description>
    </HdsToast>
  </template>
}
