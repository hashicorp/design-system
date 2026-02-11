import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsDropdown } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <div class="doc-dropdown-mock-text-align-right">
    <HdsDropdown @isInline={{true}} @listPosition="bottom-right" as |D|>
      <D.ToggleButton @text="Text Toggle" @color="secondary" />
      <D.Interactive @route="components">Item One</D.Interactive>
      <D.Interactive @route="components">Item Two</D.Interactive>
      <D.Interactive @route="components">Item Three</D.Interactive>
    </HdsDropdown>
  </div>
</template>;

export default LocalComponent;
