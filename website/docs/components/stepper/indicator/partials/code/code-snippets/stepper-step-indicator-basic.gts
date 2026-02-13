import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsStepperStepIndicator } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsStepperStepIndicator @text="1" @status="incomplete" />
</template>;

export default LocalComponent;
