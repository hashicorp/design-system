import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsButton,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @gap="24">
    <HdsButton @text="Secondary" @color="secondary" />
    <HdsButton @text="Secondary muted" @color="secondary-muted" />
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
