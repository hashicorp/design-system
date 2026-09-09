import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsThemeContext } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsThemeContext @context="dark">
    ...
  </HdsThemeContext>
</template>;

export default LocalComponent;
