import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormCheckboxGroup } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormCheckboxGroup @name="demo-visibility" as |G|>
    <G.Legend>Visibility</G.Legend>
    <G.CheckboxField name="private" @id="visibility-private" as |F|>
      <F.Label>Private</F.Label>
      <F.HelperText>Making a box private prevents users from accessing it unless
        given permission.</F.HelperText>
    </G.CheckboxField>
  </HdsFormCheckboxGroup>
</template>;

export default LocalComponent;
