import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex as |LF|>
    <div>{{! some content here }}</div>
    <LF.Item @grow={{false}}>
      {{! some other content here }}
    </LF.Item>
    <div>{{! more content here }}</div>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
