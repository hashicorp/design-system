import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsBadge } from '@hashicorp/design-system-components/components';

const BasicBadge: TemplateOnlyComponent = <template>
  <HdsBadge @text="Default badge" />
</template>;

export default BasicBadge;
