import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormToggleField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormToggleField name="demo-cost-estimate" as |F|>
    <F.Label>Enable cost estimation</F.Label>
  </HdsFormToggleField>
</template>;

export default LocalComponent;
