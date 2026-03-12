import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormTextInputField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormTextInputField
    @type="password"
    name="demo-user-password"
    placeholder="Insert your password here"
    minlength="4"
    maxlength="64"
    as |F|
  >
    <F.Label>Password</F.Label>
  </HdsFormTextInputField>
</template>;

export default LocalComponent;
