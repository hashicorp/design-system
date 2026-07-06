import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsIcon } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsIcon @name="zap" @color="var(--hds-color-boundary-brand)" />
</template>;

export default LocalComponent;
