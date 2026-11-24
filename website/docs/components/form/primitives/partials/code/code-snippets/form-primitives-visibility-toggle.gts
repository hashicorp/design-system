import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormVisibilityToggle } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormVisibilityToggle
    @isMasked={{true}}
    @ariaMessageText="Content is hidden"
  />
  <HdsFormVisibilityToggle
    @isMasked={{false}}
    @ariaMessageTextWhenVisible="Content is visible"
  />
</template>;

export default LocalComponent;
