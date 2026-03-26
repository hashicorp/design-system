import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import hdsTooltip from '@hashicorp/design-system-components/modifiers/hds-tooltip';

const LocalComponent: TemplateOnlyComponent = <template>
  <p class="hds-typography-body-300">
    <a href="#" {{hdsTooltip "<b>Hello</b>!" options=(hash allowHTML=true)}}>
      More information
    </a>
  </p>
</template>;

export default LocalComponent;
