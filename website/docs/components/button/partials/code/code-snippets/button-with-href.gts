import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';

const ButtonWithHref: TemplateOnlyComponent = <template>
  <HdsButton
    @text="Visit website"
    @icon="external-link"
    @iconPosition="trailing"
    @href="https://hashicorp.com"
  />
</template>;

export default ButtonWithHref;
