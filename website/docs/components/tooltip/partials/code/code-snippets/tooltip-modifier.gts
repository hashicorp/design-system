import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLinkStandalone } from '@hashicorp/design-system-components/components';
import hdsTooltip from '@hashicorp/design-system-components/modifiers/hds-tooltip';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLinkStandalone
    {{hdsTooltip "Hello!"}}
    @href="#"
    @icon="collections"
    @text="Read tutorial"
  />
</template>;

export default LocalComponent;
