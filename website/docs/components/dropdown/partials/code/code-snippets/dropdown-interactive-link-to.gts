import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsDropdownListItemInteractive } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <ul class="hds-dropdown__list">
    <HdsDropdownListItemInteractive @route="components">
      Activate cluster
    </HdsDropdownListItemInteractive>
  </ul>
</template>;

export default LocalComponent;
