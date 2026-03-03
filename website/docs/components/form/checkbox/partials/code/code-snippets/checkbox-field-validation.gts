import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormCheckboxField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormCheckboxField name="demo-approve-change" as |F|>
    <F.Label>I approve the changes.</F.Label>
    <F.Error>
      Error: it is necessary to explicitly approve the changes to continue.
    </F.Error>
  </HdsFormCheckboxField>
</template>;

export default LocalComponent;
