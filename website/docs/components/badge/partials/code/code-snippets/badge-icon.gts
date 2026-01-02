import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsBadge } from '@hashicorp/design-system-components/components';

const BadgeIcon: TemplateOnlyComponent = <template>
  <HdsBadge @text="Terraform" @icon="terraform" />
</template>;

export default BadgeIcon;
