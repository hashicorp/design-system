import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsReveal } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsReveal @text="Toggle me" @isOpen={{true}}>
    Additional content
  </HdsReveal>
</template>;

export default LocalComponent;
