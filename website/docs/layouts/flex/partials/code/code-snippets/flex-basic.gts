import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <div class="doc-app-frame-mock-viewport">
    <HdsLayoutFlex>
      <div>{{! some content here }}</div>
      <div>{{! some other content here }}</div>
      <div>{{! more content here }}</div>
    </HdsLayoutFlex>
  </div>
</template>;

export default LocalComponent;
