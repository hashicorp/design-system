import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLinkStandalone } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLinkStandalone
    @icon="terraform"
    @text="Request a demo"
    @href="https://www.hashicorp.com/request-demo/terraform"
  />
</template>;

export default LocalComponent;
