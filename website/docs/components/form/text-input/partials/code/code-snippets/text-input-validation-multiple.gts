import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormTextInputField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormTextInputField
    @type="password"
    @value="1234"
    @isInvalid={{true}}
    name="demo-password"
    as |F|
  >
    <F.Label>Password</F.Label>
    <F.Error as |E|>
      <E.Message>Length should be at least 12 characters</E.Message>
      <E.Message>Must contain at least a special character</E.Message>
    </F.Error>
  </HdsFormTextInputField>
</template>;

export default LocalComponent;
