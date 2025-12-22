import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsBadgeCount } from '@hashicorp/design-system-components/components';

const BadgeCountBasic: TemplateOnlyComponent = <template>
  <HdsBadgeCount @text="3" />
</template>;

export default BadgeCountBasic;
