import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @justify="space-between" @align="center">
    {{! the flex items here }}
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
