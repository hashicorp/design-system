import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLinkStandalone } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLinkStandalone
    @icon="film"
    @text="Watch tutorial video"
    @href="https://helios.hashicorp.design/"
  />
</template>;

export default LocalComponent;
