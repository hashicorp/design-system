import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormToggleGroup } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormToggleGroup as |G|>
    <G.Legend>Visibility</G.Legend>
    <G.ToggleField name="demo-private" @id="visibility-private" as |F|>
      <F.Label>Private</F.Label>
      <F.HelperText>
        Making a box private prevents users from accessing it unless given
        permission.
      </F.HelperText>
    </G.ToggleField>
  </HdsFormToggleGroup>
</template>;

export default LocalComponent;
