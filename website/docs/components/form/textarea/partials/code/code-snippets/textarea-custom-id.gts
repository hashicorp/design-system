import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormTextareaField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormTextareaField @id="my-control" name="demo-description" as |F|>
    <F.Label>Short description</F.Label>
    <F.HelperText>Add a short description about the workspace you are creating.</F.HelperText>
  </HdsFormTextareaField>
</template>;

export default LocalComponent;
