import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsButton @text="Create cluster" @icon="plus" @isIconOnly={{true}} />
</template>;

export default LocalComponent;
