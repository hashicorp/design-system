import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormCheckboxGroup } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormCheckboxGroup @name="demo-datacenter" as |G|>
    <G.Legend>Valid datacenters</G.Legend>
    <G.CheckboxField as |F|>
      <F.Label>NYC1</F.Label>
    </G.CheckboxField>
    <G.CheckboxField as |F|>
      <F.Label>DC1</F.Label>
    </G.CheckboxField>
    <G.CheckboxField as |F|>
      <F.Label>NYC2</F.Label>
    </G.CheckboxField>
    <G.CheckboxField as |F|>
      <F.Label>SF1</F.Label>
    </G.CheckboxField>
  </HdsFormCheckboxGroup>
</template>;

export default LocalComponent;
