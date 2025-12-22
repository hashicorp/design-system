import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';

const ButtonLayout: TemplateOnlyComponent = <template>
  <div class="doc-button-mock-text-align-right">
    <HdsButton @text="inline layout" @isInline={{true}} />
  </div>
</template>;

export default ButtonLayout;
