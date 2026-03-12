import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormTextareaField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormTextareaField
    @value="A"
    @isInvalid={{true}}
    name="demo-description"
    as |F|
  >
    <F.Label>Short description</F.Label>
    <F.Error>Error: the description text is too short.</F.Error>
  </HdsFormTextareaField>
</template>;

export default LocalComponent;
