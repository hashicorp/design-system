import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormVisibilityToggle } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormVisibilityToggle @isMasked={{true}} />
  <HdsFormVisibilityToggle @isMasked={{false}} />
</template>;

export default LocalComponent;
