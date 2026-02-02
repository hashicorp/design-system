import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsAlert,
  HdsTextDisplay,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <div class="doc-alert-demo-heading">
    <HdsTextDisplay @tag="h1" @size="500">Edit credit card</HdsTextDisplay>
  </div>
  <HdsAlert @type="inline" @color="critical" as |A|>
    <A.Title @tag="h2">Form submission error</A.Title>
    <A.Description>
      Correct the formatting of the following fields to update your user
      profile:
    </A.Description>
    <A.Description>
      <HdsLinkInline @href="#" @color="secondary">
        Expiration date
      </HdsLinkInline>
    </A.Description>
  </HdsAlert>
</template>;

export default LocalComponent;
