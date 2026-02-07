import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormLabel } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormLabel @controlId="control-ID">
    My label
  </HdsFormLabel>
</template>;

export default LocalComponent;
