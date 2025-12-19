import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';

const ButtonFullWidth: TemplateOnlyComponent = <template>
  <HdsButton @text="Full width button" @isFullWidth={{true}} />
</template>;

export default ButtonFullWidth;
