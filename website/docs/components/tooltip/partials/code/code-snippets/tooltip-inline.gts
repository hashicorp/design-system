import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsTooltipButton,
  HdsIcon,
  HdsTextDisplay,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTextDisplay @tag="h4">
    Header text
    <HdsTooltipButton @text="Hello!" aria-label="More information">
      <HdsIcon @name="info" />
    </HdsTooltipButton>
  </HdsTextDisplay>
</template>;

export default LocalComponent;
