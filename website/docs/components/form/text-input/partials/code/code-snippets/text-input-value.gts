import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormTextInputField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormTextInputField
    @value="my-cluster-1234"
    name="demo-cluster-name"
    as |F|
  >
    <F.Label>Cluster name</F.Label>
  </HdsFormTextInputField>
</template>;

export default LocalComponent;
