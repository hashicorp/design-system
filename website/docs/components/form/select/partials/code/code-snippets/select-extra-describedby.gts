import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormSelectField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormSelectField
    @extraAriaDescribedBy="my-extra-element-ID"
    name="demo-target-infrastructure"
    as |F|
  >
    <F.Label>Target infrastructure</F.Label>
    <F.HelperText>The target infrastructure is where you want to deploy your
      apps.</F.HelperText>
    <F.Options>
      <option value="Kubernetes">Kubernetes</option>
      <option value="Other">Other</option>
    </F.Options>
  </HdsFormSelectField>
</template>;

export default LocalComponent;
