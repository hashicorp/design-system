import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormMaskedInputField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormMaskedInputField
    @isInvalid={{true}}
    name="demo-team-token"
    @value="036215df4996c649928d8864b4"
    as |F|
  >
    <F.Label>Terraform Cloud team token</F.Label>
    <F.Error as |E|>
      <E.Message>Length should be at least 40 characters</E.Message>
      <E.Message>Should not contain special characters or spaces</E.Message>
    </F.Error>
  </HdsFormMaskedInputField>
</template>;

export default LocalComponent;
