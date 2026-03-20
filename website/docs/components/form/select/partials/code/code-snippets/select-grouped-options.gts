import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormSelectField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormSelectField name="demo-target-infrastructure" as |F|>
    <F.Label>Target infrastructure</F.Label>
    <F.Options>
      <optgroup label="Most common">
        <option value="Kubernetes">Kubernetes</option>
        <option value="AWS">AWS</option>
      </optgroup>
      <optgroup label="Others">
        <option value="CloudWise" selected>CloudWise</option>
        <option value="SWA">SWA</option>
        <option value="Other">Other</option>
      </optgroup>
    </F.Options>
  </HdsFormSelectField>
</template>;

export default LocalComponent;
