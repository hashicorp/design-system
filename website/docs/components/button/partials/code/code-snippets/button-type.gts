import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';

const ButtonType: TemplateOnlyComponent = <template>
  <HdsButton @text="Submit" type="submit" />
</template>;

export default ButtonType;
