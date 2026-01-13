import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsButton @text="Next step" @icon="arrow-right" @iconPosition="trailing" />
</template>;

export default LocalComponent;
