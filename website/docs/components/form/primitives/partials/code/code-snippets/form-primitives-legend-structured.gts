import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormLegend,
  HdsBadge,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormLegend>
    <span>Some text</span>
    <HdsBadge @size="small" @text="Some badge" @color="highlight" />
  </HdsFormLegend>
</template>;

export default LocalComponent;
