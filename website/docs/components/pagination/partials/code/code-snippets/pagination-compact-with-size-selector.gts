import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsPaginationCompact } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsPaginationCompact @showSizeSelector={{true}} />
</template>;

export default LocalComponent;
