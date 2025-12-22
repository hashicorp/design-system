import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';

const ButtonIconOnly: TemplateOnlyComponent = <template>
  <HdsButton @text="Create cluster" @icon="plus" @isIconOnly={{true}} />
</template>;

export default ButtonIconOnly;
