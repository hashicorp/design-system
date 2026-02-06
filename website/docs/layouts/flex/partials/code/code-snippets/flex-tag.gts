import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @tag="ul" as |LF|>
    <li>{{! some content here }}</li>
    <LF.Item @tag="li">
      {{! some other content here }}
    </LF.Item>
    <li>{{! more content here }}</li>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
