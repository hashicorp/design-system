import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormTextInputField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormTextInputField
    @extraAriaDescribedBy="my-extra-element-ID"
    name="demo-aws-account-id"
    as |F|
  >
    <F.Label>AWS Account ID</F.Label>
    <F.HelperText>Copy this ID to your AWS Resource Access Manager to initiate
      the resource share.</F.HelperText>
  </HdsFormTextInputField>
</template>;

export default LocalComponent;
