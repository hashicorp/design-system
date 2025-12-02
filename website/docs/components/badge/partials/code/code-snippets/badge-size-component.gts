import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsBadge } from '@hashicorp/design-system-components/components';

const BadgeSize: TemplateOnlyComponent = <template>
  <HdsBadge @text="Small badge" @size="small" />
  <HdsBadge @text="Large badge" @size="large" />
</template>;

export default BadgeSize;
