import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsPageHeader } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsPageHeader as |PH|>
    <PH.Title>Page title</PH.Title>
  </HdsPageHeader>
</template>;

export default LocalComponent;
