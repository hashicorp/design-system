import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormToggleField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormToggleField name="demo-approve-change" as |F|>
    <F.Label>I approve the changes.</F.Label>
    <F.Error>
      Error: it is necessary to explicitly approve the changes to continue.
    </F.Error>
  </HdsFormToggleField>
</template>;

export default LocalComponent;
