import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormRadioGroup } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormRadioGroup @name="datacenter-demo1" as |G|>
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
</template>;

export default LocalComponent;
