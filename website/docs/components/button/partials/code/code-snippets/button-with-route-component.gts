import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';

const ButtonWithRoute: TemplateOnlyComponent = <template>
  <HdsButton @text="Back to homepage" @icon="arrow-left" @route="index" />
</template>;

export default ButtonWithRoute;
