import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsTag } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTag
    @text="This is a very long text that should go on multiple lines"
    @tooltipPlacement="right"
  />
</template>;

export default LocalComponent;
