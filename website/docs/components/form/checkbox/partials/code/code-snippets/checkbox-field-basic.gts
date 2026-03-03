import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormCheckboxField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormCheckboxField name="demo-cost-estimation" as |F|>
    <F.Label>Enable cost estimation</F.Label>
  </HdsFormCheckboxField>
</template>;

export default LocalComponent;
