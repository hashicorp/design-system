import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormToggleGroup,
  HdsForm,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm as |FORM|>
    <FORM.Section>
      <HdsFormToggleGroup @isRequired={{true}} as |G|>
        <G.Legend>Visibility</G.Legend>
        <G.ToggleField name="demo-private" @id="visibility-private" as |F|>
          <F.Label>Private</F.Label>
        </G.ToggleField>
      </HdsFormToggleGroup>

      <HdsFormToggleGroup @isOptional={{true}} as |G|>
        <G.Legend>Visibility</G.Legend>
        <G.ToggleField
          name="demo-private"
          @id="visibility-private-optional"
          as |F|
        >
          <F.Label>Private</F.Label>
        </G.ToggleField>
      </HdsFormToggleGroup>
    </FORM.Section>
  </HdsForm>
</template>;

export default LocalComponent;
