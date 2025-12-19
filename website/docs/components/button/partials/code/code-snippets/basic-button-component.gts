import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';

const BasicButton: TemplateOnlyComponent = <template>
  <HdsButton @text="Basic button" />
</template>;

export default BasicButton;
