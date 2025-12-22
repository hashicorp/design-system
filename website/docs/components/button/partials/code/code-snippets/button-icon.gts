import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';

const ButtonIcon: TemplateOnlyComponent = <template>
  <HdsButton @text="Create cluster" @icon="plus" />
</template>;

export default ButtonIcon;
