import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsIcon } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <button aria-label="Check activity" type="button">
    <HdsIcon @name="activity" />
  </button>
</template>;

export default LocalComponent;
