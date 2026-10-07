import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormVisibilityToggle } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormVisibilityToggle
    @isVisible={{false}}
    @ariaLabel="Toggle masked content"
    @ariaMessageTextWhenVisible="Masked content is visible"
  />
</template>;

export default LocalComponent;
