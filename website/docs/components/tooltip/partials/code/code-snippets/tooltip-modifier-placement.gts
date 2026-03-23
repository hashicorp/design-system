import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import { HdsButton } from '@hashicorp/design-system-components/components';
import hdsTooltip from '@hashicorp/design-system-components/modifiers/hds-tooltip';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsButton
    {{hdsTooltip "Hello!" options=(hash placement="right")}}
    @icon="external-link"
    @text="Visit website"
    @href="https://hashicorp.com"
  />
</template>;

export default LocalComponent;
