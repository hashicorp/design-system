import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsTag } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTag
    @color="primary"
    @text="My link tag"
    @route="show"
    @model="components/tag"
  />
</template>;

export default LocalComponent;
