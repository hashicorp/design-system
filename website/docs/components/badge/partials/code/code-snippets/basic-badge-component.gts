import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsBadge } from '@hashicorp/design-system-components/components';
import type { HdsBadgeSignature } from '@hashicorp/design-system-components/components/hds/badge/index';

interface BasicBadgeSignature {
  Element: HdsBadgeSignature['Element'];
}

const BasicBadge: TemplateOnlyComponent<BasicBadgeSignature> = <template>
  <HdsBadge @text="Default badge" ...attributes />
</template>;

export default BasicBadge;
