import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormTextareaField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormTextareaField @width="200px" name="demo-description" as |F|>
    <F.Label>Short description</F.Label>
  </HdsFormTextareaField>
</template>;

export default LocalComponent;
