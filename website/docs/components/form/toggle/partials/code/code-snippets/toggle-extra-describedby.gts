import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormToggleField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormToggleField
    @extraAriaDescribedBy="my-extra-element-ID"
    name="demo-cost-estimate"
    as |F|
  >
    <F.Label>Enable cost estimation</F.Label>
    <F.HelperText>
      With this option enabled you will receive an approximate cost estimation.
    </F.HelperText>
  </HdsFormToggleField>
</template>;

export default LocalComponent;
