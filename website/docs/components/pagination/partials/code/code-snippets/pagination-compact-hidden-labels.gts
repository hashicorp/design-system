import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsPaginationCompact } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsPaginationCompact @showLabels={{false}} />
</template>;

export default LocalComponent;
