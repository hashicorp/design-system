import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsBadgeCount } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsBadgeCount @text="3" @color="neutral-dark-mode" />
</template>;

export default LocalComponent;
