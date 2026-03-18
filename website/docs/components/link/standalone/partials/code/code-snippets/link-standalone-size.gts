import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLinkStandalone } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLinkStandalone
    @icon="collections"
    @text="Read tutorial"
    @size="small"
    @href="https://helios.hashicorp.design/"
  />

  <HdsLinkStandalone
    @icon="collections"
    @text="Read tutorial"
    @size="large"
    @href="https://helios.hashicorp.design/"
  />
</template>;

export default LocalComponent;
