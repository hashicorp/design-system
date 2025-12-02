import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsBadge } from '@hashicorp/design-system-components/components';
import type { HdsBadgeSignature } from '@hashicorp/design-system-components/components/hds/badge/index';

interface BadgeIconOnlySignature {
  Element: HdsBadgeSignature['Element'];
}

const BadgeIconOnly: TemplateOnlyComponent<BadgeIconOnlySignature> = <template>
  <HdsBadge
    @text="Terraform"
    @icon="terraform"
    @isIconOnly={{true}}
    ...attributes
  />
</template>;

export default BadgeIconOnly;
