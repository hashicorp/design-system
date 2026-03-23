import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsTooltipButton,
  HdsIcon,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTooltipButton @text="Hello!" aria-label="More information">
    <HdsIcon @name="info" />
  </HdsTooltipButton>
</template>;

export default LocalComponent;
