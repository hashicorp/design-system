import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsLayoutFlex,
  HdsIconTile,
  HdsTextDisplay,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @align="start" @gap="16" class="doc-flex-outlined-container">
    <HdsIconTile @logo="boundary" />
    <HdsTextDisplay @size="500" @tag="h5">Lorem ipsum dolor</HdsTextDisplay>
    <HdsDropdown class="doc-flex-margin-left-auto" as |D|>
      <D.ToggleButton @text="Main actions" />
      <D.Interactive @route="components">Action One</D.Interactive>
      <D.Interactive @route="components">Action Two</D.Interactive>
      <D.Interactive @route="components">Action Three</D.Interactive>
    </HdsDropdown>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
