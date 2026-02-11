import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsStepperTaskIndicator } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsStepperTaskIndicator @status="incomplete" @isInteractive={{true}} />
</template>;

export default LocalComponent;
