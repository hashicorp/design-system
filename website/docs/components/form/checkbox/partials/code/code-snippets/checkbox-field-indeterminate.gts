import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormCheckboxField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormCheckboxField
    indeterminate={{true}}
    name="demo-all-datacenters"
    as |F|
  >
    <F.Label>All datacenters</F.Label>
  </HdsFormCheckboxField>
</template>;

export default LocalComponent;
