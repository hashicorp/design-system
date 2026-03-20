import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormTextInputField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormTextInputField
    @type="email"
    @value="jane.doe@.com"
    @isInvalid={{true}}
    name="demo-email"
    as |F|
  >
    <F.Label>Email</F.Label>
    <F.Error>The provided email is not valid.</F.Error>
  </HdsFormTextInputField>
</template>;

export default LocalComponent;
