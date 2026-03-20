import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormTextInputField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormTextInputField
    @type="search"
    placeholder="Search clusters"
    @width="200px"
    name="demo-filter"
    as |F|
  >
    <F.Label>Filter the list:</F.Label>
  </HdsFormTextInputField>
</template>;

export default LocalComponent;
