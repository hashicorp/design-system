import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormTextareaField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormTextareaField
    @value="&lt;a&gt;"
    @isInvalid={{true}}
    name="demo-description"
    as |F|
  >
    <F.Label>Short description</F.Label>
    <F.Error as |E|>
      <E.Message>Length should be at least 12 characters</E.Message>
      <E.Message>Can not contain HTML</E.Message>
      <E.Message>B</E.Message>
    </F.Error>
  </HdsFormTextareaField>
</template>;

export default LocalComponent;
