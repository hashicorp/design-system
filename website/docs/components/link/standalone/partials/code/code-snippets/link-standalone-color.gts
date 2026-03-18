import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLinkStandalone } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLinkStandalone
    @color="secondary"
    @icon="collections"
    @text="Read tutorial"
    @href="https://helios.hashicorp.design/"
  />
</template>;

export default LocalComponent;
