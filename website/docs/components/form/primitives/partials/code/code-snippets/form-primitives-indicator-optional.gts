import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormIndicator } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormIndicator @isOptional={{true}} />
</template>;

export default LocalComponent;
