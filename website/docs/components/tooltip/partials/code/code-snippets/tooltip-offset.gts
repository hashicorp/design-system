import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';

import {
  HdsTooltipButton,
  HdsStepperStepIndicator,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTooltipButton @text="Hello!" @offset={{array 50 30}}>
    <HdsStepperStepIndicator @text="1" @status="incomplete" />
  </HdsTooltipButton>
</template>;

export default LocalComponent;
