import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsBadge } from '@hashicorp/design-system-components/components';

const BadgeType: TemplateOnlyComponent = <template>
  <HdsBadge @text="Inverted badge" @type="inverted" />
  <HdsBadge @text="Outlined badge" @type="outlined" />
</template>;

export default BadgeType;
