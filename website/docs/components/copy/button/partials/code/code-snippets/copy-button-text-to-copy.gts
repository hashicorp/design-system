import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCopyButton } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsCopyButton
    @text="Copy your secret key"
    @textToCopy="someSecretThingGoesHere"
  />
</template>;

export default LocalComponent;
