import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsIcon } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsIcon @name="zap" @color="var(--hds-product-boundary-brand-color)" />
</template>;

export default LocalComponent;
