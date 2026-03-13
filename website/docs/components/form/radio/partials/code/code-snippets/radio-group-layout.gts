import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormRadioGroup,
  HdsForm,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm as |FORM|>
    <FORM.Section>
      <HdsFormRadioGroup @name="datacenter-demo2" as |G|>
        <G.Legend>Choose datacenter</G.Legend>
        <G.RadioField as |F|>
          <F.Label>NYC1</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>DC1</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>NYC2</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>SF1</F.Label>
        </G.RadioField>
      </HdsFormRadioGroup>
    </FORM.Section>

    <FORM.Section>
      <HdsFormRadioGroup @layout="horizontal" @name="datacenter-demo3" as |G|>
        <G.Legend>Choose datacenter</G.Legend>
        <G.RadioField as |F|>
          <F.Label>NYC1</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>DC1</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>NYC2</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>SF1</F.Label>
        </G.RadioField>
      </HdsFormRadioGroup>
    </FORM.Section>
  </HdsForm>
</template>;

export default LocalComponent;
