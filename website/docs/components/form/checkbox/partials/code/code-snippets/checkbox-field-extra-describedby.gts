import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormCheckboxField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormCheckboxField
    @extraAriaDescribedBy="my-extra-element-ID"
    name="demo-cost-estimation"
    as |F|
  >
    <F.Label>Enable cost estimation</F.Label>
    <F.HelperText>
      With this option enabled you will receive an approximate cost estimation.
    </F.HelperText>
  </HdsFormCheckboxField>
</template>;

export default LocalComponent;
