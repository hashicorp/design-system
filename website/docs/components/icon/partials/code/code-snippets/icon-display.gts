import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsIcon } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsIcon @name="triangle" @isInline={{true}} />
  <HdsIcon @name="triangle-fill" @isInline={{true}} />
</template>;

export default LocalComponent;
