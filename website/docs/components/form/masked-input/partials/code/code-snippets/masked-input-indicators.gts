import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormMaskedInputField,
  HdsForm,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm as |FORM|>
    <FORM.Section>
      <HdsFormMaskedInputField
        @isRequired={{true}}
        name="demo-team-token"
        as |F|
      >
        <F.Label>Terraform Cloud team token</F.Label>
        <F.HelperText>The token must include permissions to manage workspaces
          and projects.</F.HelperText>
      </HdsFormMaskedInputField>

      <HdsFormMaskedInputField
        @isOptional={{true}}
        name="demo-team-token"
        as |F|
      >
        <F.Label>Terraform Cloud team token</F.Label>
        <F.HelperText>The token must include permissions to manage workspaces
          and projects.</F.HelperText>
      </HdsFormMaskedInputField>
    </FORM.Section>
  </HdsForm>
</template>;

export default LocalComponent;
