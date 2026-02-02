import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAppFooter } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsAppFooter as |AF|>
    <AF.LegalLinks />
  </HdsAppFooter>
</template>;

export default LocalComponent;
