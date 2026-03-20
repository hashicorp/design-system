import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormTextInputField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormTextInputField
    @hasVisibilityToggle={{false}}
    @type="password"
    @value="1234567890"
    name="demo-password"
    as |F|
  >
    <F.Label>Password</F.Label>
  </HdsFormTextInputField>
</template>;

export default LocalComponent;
