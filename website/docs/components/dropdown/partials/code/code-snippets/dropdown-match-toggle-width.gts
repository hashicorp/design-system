import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsDropdown } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsDropdown @matchToggleWidth={{true}} as |D|>
    <D.ToggleButton @text="Text Toggle" />
    <D.Interactive @route="components">Item One</D.Interactive>
    <D.Interactive @route="components">Item Two</D.Interactive>
    <D.Interactive @route="components">Item Three</D.Interactive>
    <D.Interactive @route="components">Item Four</D.Interactive>
  </HdsDropdown>
</template>;

export default LocalComponent;
