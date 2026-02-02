import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { LinkTo } from '@ember/routing';

import {
  HdsAlert,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsAlert @type="inline" @color="success" as |A|>
    <A.Title>Title here</A.Title>
    <A.Description>
      The description can contain
      {{#if true}}conditional logic{{/if}}, Ember components, and HTML tags,
      like
      <strong>strong text</strong>,
      <em>emphasized text</em>,
      <code>code</code>,
      <pre>pre</pre>,
      <HdsLinkInline @color="secondary" @href="#">inline</HdsLinkInline>
      <LinkTo @route="index">links</LinkTo>.
    </A.Description>
  </HdsAlert>
</template>;

export default LocalComponent;
