import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsStepperTaskIndicator } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsStepperTaskIndicator @status="progress" @isInteractive={{true}} />
  <HdsStepperTaskIndicator @status="processing" @isInteractive={{true}} />
  <HdsStepperTaskIndicator @status="complete" @isInteractive={{true}} />
</template>;

export default LocalComponent;
