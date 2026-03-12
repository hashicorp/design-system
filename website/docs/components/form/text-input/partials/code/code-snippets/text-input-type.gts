import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormTextInputField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormTextInputField
    @type="email"
    @value="janedoe@email.com"
    name="demo-email"
    as |F|
  >
    <F.Label>Email</F.Label>
  </HdsFormTextInputField>
  <br />
  <HdsFormTextInputField @type="date" name="demo-birthday" as |F|>
    <F.Label>Date of birth</F.Label>
  </HdsFormTextInputField>
</template>;

export default LocalComponent;
