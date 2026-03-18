import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLinkInline } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  Lorem
  <HdsLinkInline
    @color="secondary"
    @href="https://helios.hashicorp.design/"
  >ipsum dolor</HdsLinkInline>
  sit amet consectetur adipiscing elit.
</template>;

export default LocalComponent;
