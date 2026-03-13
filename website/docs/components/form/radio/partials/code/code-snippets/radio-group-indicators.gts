import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormRadioGroup,
  HdsForm,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm as |FORM|>
    <FORM.Section>
      <HdsFormRadioGroup
        @isRequired={{true}}
        @layout="horizontal"
        @name="method-demo2"
        as |G|
      >
        <G.Legend>Method</G.Legend>
        <G.HelperText>Choose which HTTP method to use for the communication
          channel.</G.HelperText>
        <G.RadioField as |F|><F.Label>POST</F.Label></G.RadioField>
        <G.RadioField as |F|><F.Label>GET</F.Label></G.RadioField>
        <G.RadioField as |F|><F.Label>PUT</F.Label></G.RadioField>
      </HdsFormRadioGroup>

      <HdsFormRadioGroup
        @isOptional={{true}}
        @layout="horizontal"
        @name="method-demo3"
        as |G|
      >
        <G.Legend>Method</G.Legend>
        <G.HelperText>Choose which HTTP method to use for the communication
          channel.</G.HelperText>
        <G.RadioField as |F|><F.Label>POST</F.Label></G.RadioField>
        <G.RadioField as |F|><F.Label>GET</F.Label></G.RadioField>
        <G.RadioField as |F|><F.Label>PUT</F.Label></G.RadioField>
      </HdsFormRadioGroup>
    </FORM.Section>
  </HdsForm>
</template>;

export default LocalComponent;
