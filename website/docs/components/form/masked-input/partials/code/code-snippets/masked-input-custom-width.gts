import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormMaskedInputField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormMaskedInputField @width="250px" name="demo-team-token" as |F|>
    <F.Label>Terraform Cloud team token</F.Label>
  </HdsFormMaskedInputField>
</template>;

export default LocalComponent;
