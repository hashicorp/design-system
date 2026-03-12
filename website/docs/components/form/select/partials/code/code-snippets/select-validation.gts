import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormSelectField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormSelectField
    @isInvalid={{true}}
    name="demo-target-infrastructure"
    as |F|
  >
    <F.Label>Target infrastructure</F.Label>
    <F.HelperText>The target infrastructure is where you want to deploy your
      apps.</F.HelperText>
    <F.Options>
      <option value=""></option>
      <option value="Kubernetes">Kubernetes</option>
      <option value="Other">Other</option>
    </F.Options>
    <F.Error>Error: select one of the options.</F.Error>
  </HdsFormSelectField>
</template>;

export default LocalComponent;
