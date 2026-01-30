import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsLayoutFlex,
  HdsIconTile,
  HdsTextDisplay,
  HdsButton,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @align="start" @gap="16" class="doc-flex-outlined-container">
    <HdsIconTile @logo="boundary" />
    <HdsTextDisplay @size="500" @tag="h5">Lorem ipsum dolor</HdsTextDisplay>
    <HdsButton
      class="doc-flex-margin-left-auto"
      @text="Main action"
      @icon="edit"
    />
    <HdsDropdown as |D|>
      <D.ToggleButton @text="More actions" @color="secondary" />
      <D.Interactive @route="components">Action One</D.Interactive>
      <D.Interactive @route="components">Action Two</D.Interactive>
      <D.Interactive @route="components">Action Three</D.Interactive>
    </HdsDropdown>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
