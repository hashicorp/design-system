import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsBadge } from '@hashicorp/design-system-components/components';

const BadgeIconOnly: TemplateOnlyComponent = <template>
  <HdsBadge @text="Terraform" @icon="terraform" @isIconOnly={{true}} />
</template>;

export default BadgeIconOnly;
