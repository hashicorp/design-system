import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsDropdown } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsDropdown @preserveContentInDom={{true}} as |D|>
    <D.ToggleButton @text="Text Toggle" />
    <D.Interactive @route="components">This item should always be present in the
      DOM, regardless of whether the dropdown is open or closed</D.Interactive>
  </HdsDropdown>
</template>;

export default LocalComponent;
