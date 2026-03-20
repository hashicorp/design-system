import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormTextareaField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormTextareaField
    name="demo-description"
    placeholder="Workspace description"
    minlength="4"
    maxlength="1024"
    as |F|
  >
    <F.Label>Short description</F.Label>
  </HdsFormTextareaField>
</template>;

export default LocalComponent;
