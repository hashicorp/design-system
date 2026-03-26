import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import { HdsTooltipButton } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTooltipButton
    @extraTippyOptions={{hash allowHTML=true}}
    @text="<b>Hello</b> <em>there</em>!"
  >
    More information
  </HdsTooltipButton>
</template>;

export default LocalComponent;
