import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsButton,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @gap="24">
    <HdsButton @text="Secondary" @color="secondary" />
    <HdsButton @text="Tertiary" @color="tertiary" @icon="bulb" />
    <HdsButton @text="Critical" @color="critical" />
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
