import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormSelectField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormSelectField name="demo-target-infrastructure" as |F|>
    <F.Label>Target infrastructure</F.Label>
    <F.Options>
      <option value="Kubernetes">Kubernetes</option>
      <option value="Other" selected>Other</option>
    </F.Options>
  </HdsFormSelectField>
</template>;

export default LocalComponent;
