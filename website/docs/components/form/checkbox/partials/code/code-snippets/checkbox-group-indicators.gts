import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsForm,
  HdsFormCheckboxGroup,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm as |FORM|>
    <FORM.Section>
      <HdsFormCheckboxGroup
        @isRequired={{true}}
        @layout="horizontal"
        @name="demo-methods"
        as |G|
      >
        <G.Legend>Methods</G.Legend>
        <G.HelperText>All methods are applied by default unless specified.</G.HelperText>
        <G.CheckboxField checked as |F|><F.Label
          >POST</F.Label></G.CheckboxField>
        <G.CheckboxField checked as |F|><F.Label>GET</F.Label></G.CheckboxField>
        <G.CheckboxField checked as |F|><F.Label>PUT</F.Label></G.CheckboxField>
      </HdsFormCheckboxGroup>

      <HdsFormCheckboxGroup
        @isOptional={{true}}
        @layout="horizontal"
        @name="demo-methods"
        as |G|
      >
        <G.Legend>Methods</G.Legend>
        <G.HelperText>All methods are applied by default unless specified.</G.HelperText>
        <G.CheckboxField checked as |F|><F.Label
          >POST</F.Label></G.CheckboxField>
        <G.CheckboxField checked as |F|><F.Label>GET</F.Label></G.CheckboxField>
        <G.CheckboxField checked as |F|><F.Label>PUT</F.Label></G.CheckboxField>
      </HdsFormCheckboxGroup>
    </FORM.Section>
  </HdsForm>
</template>;

export default LocalComponent;
