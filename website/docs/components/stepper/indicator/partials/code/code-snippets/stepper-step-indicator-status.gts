import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsStepperStepIndicator } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsStepperStepIndicator
    @text="1"
    @status="progress"
    @isInteractive={{true}}
  />
  <HdsStepperStepIndicator
    @text="1"
    @status="processing"
    @isInteractive={{true}}
  />
  <HdsStepperStepIndicator
    @text="1"
    @status="complete"
    @isInteractive={{true}}
  />
</template>;

export default LocalComponent;
