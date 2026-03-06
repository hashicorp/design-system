import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsForm,
  HdsFormTextInputField,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm as |FORM|>
    <FORM.Section>
      <HdsFormTextInputField
        @isRequired={{true}}
        name="demo-aws-account-id"
        as |F|
      >
        <F.Label>AWS Account ID</F.Label>
        <F.HelperText>Copy this ID to your AWS Resource Access Manager to
          initiate the resource share.</F.HelperText>
      </HdsFormTextInputField>

      <HdsFormTextInputField
        @isOptional={{true}}
        name="demo-aws-account-id"
        as |F|
      >
        <F.Label>AWS Account ID</F.Label>
        <F.HelperText>Copy this ID to your AWS Resource Access Manager to
          initiate the resource share.</F.HelperText>
      </HdsFormTextInputField>
    </FORM.Section>
  </HdsForm>
</template>;

export default LocalComponent;
