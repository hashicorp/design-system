import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { on } from '@ember/modifier';

import {
  HdsDropdown,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @gap="24">
    <HdsDropdown as |D|>
      <D.ToggleButton @color="secondary" @text="Secondary" />
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
    <HdsDropdown as |D|>
      <D.ToggleButton @color="secondary-muted" @text="Secondary muted" />
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
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
