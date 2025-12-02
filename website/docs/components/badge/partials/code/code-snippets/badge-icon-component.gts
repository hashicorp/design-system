import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsBadge } from '@hashicorp/design-system-components/components';
import type { HdsBadgeSignature } from '@hashicorp/design-system-components/components/hds/badge/index';

interface BadgeIconSignature {
  Element: HdsBadgeSignature['Element'];
}

const BadgeIcon: TemplateOnlyComponent<BadgeIconSignature> = <template>
  <HdsBadge @text="Terraform" @icon="terraform" ...attributes />
</template>;

export default BadgeIcon;
