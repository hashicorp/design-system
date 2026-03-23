import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormMaskedInputField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormMaskedInputField
    minlength="40"
    maxlength="40"
    name="demo-team-token"
    as |F|
  >
    <F.Label>Terraform Cloud team token</F.Label>
  </HdsFormMaskedInputField>
</template>;

export default LocalComponent;
