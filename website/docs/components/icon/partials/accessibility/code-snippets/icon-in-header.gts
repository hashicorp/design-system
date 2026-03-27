import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsIcon } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <h2>
    Activity report
    <HdsIcon @name="activity" />
  </h2>
</template>;

export default LocalComponent;
