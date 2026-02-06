import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormLegend } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormLegend @isRequired={{true}}>My legend</HdsFormLegend>
</template>;

export default LocalComponent;
