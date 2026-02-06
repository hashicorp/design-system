import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsDropdown } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsDropdown as |D|>
    <D.ToggleIcon @icon="settings" @text="settings menu" />
    <D.Title @text="Signed In" />
    <D.Description @text="email@domain.com" />
    <D.Separator />
    <D.Interactive @route="components">Settings and Preferences</D.Interactive>
    <D.Interactive
      @route="components"
      @icon="trash"
      @color="critical"
    >Delete</D.Interactive>
  </HdsDropdown>
</template>;

export default LocalComponent;
