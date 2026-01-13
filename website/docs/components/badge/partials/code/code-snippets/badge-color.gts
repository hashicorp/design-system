import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsBadge } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsBadge @text="Highlight badge" @color="highlight" />
  <HdsBadge @text="Success badge" @color="success" />
  <HdsBadge @text="Warning badge" @color="warning" />
  <HdsBadge @text="Critical badge" @color="critical" />
</template>;

export default LocalComponent;
