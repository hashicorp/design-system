import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormVisibilityToggle } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormVisibilityToggle
    @isVisible={{true}}
    @ariaLabel="Toggle masked content"
    @ariaMessageText="Masked content is hidden"
  />
  <HdsFormVisibilityToggle
    @isVisible={{false}}
    @ariaLabel="Toggle masked content"
    @ariaMessageText="Masked content is visible"
  />
</template>;

export default LocalComponent;
