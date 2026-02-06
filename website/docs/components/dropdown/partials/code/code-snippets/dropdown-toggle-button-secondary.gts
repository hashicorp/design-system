import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { on } from '@ember/modifier';

import { HdsDropdown } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsDropdown as |D|>
    <D.ToggleButton @text="Text Toggle" @color="secondary" />
    <D.Interactive @route="components">Item One</D.Interactive>
    <D.Interactive @route="components">Item Two</D.Interactive>
    <D.Interactive @route="components">Item Three</D.Interactive>
    <D.Interactive {{on "click" D.close}}>Item Four (closes on click)</D.Interactive>
    <D.Separator />
    <D.Interactive
      @route="components"
      @color="critical"
      @icon="trash"
    >Delete</D.Interactive>
  </HdsDropdown>
</template>;

export default LocalComponent;
