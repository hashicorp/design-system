import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsIcon } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsIcon @name="alert-circle" @color="var(--hds-color-foreground-success)" />
</template>;

export default LocalComponent;
