import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsSeparator } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsSeparator @spacing="0" />
</template>;

export default LocalComponent;
