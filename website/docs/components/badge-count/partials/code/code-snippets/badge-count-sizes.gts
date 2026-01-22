import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsBadgeCount } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsBadgeCount @text="3" @size="small" />
  <HdsBadgeCount @text="3" @size="large" />
</template>;

export default LocalComponent;
