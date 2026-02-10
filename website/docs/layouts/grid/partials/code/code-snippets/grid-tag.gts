import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutGrid } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutGrid @tag="ul" as |LG|>
    <li>{{! some content here }}</li>
    <LG.Item @tag="li">
      {{! some other content here }}
    </LG.Item>
    <li>{{! more content here }}</li>
  </HdsLayoutGrid>
</template>;

export default LocalComponent;
