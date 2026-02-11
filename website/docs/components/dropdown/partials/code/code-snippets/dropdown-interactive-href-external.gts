import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsDropdownListItemInteractive } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <ul class="hds-dropdown__list">
    <HdsDropdownListItemInteractive
      @href="https://www.hashicorp.com/request-demo/terraform"
      @trailingIcon="external-link"
    >
      Request a demo
    </HdsDropdownListItemInteractive>
  </ul>
</template>;

export default LocalComponent;
