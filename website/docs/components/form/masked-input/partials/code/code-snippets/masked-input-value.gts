import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormMaskedInputField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormMaskedInputField
    @value="036215df4996ca649928d8864b4df9e42cba0d6d"
    name="demo-team-token"
    as |F|
  >
    <F.Label>Terraform Cloud team token</F.Label>
  </HdsFormMaskedInputField>
</template>;

export default LocalComponent;
