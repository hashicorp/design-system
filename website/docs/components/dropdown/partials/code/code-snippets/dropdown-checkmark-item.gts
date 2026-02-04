import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsDropdown,
  HdsLinkStandalone,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsDropdown as |D|>
    <D.ToggleButton @text="HCP Design Sandbox" @color="secondary" />
    <D.Checkmark>ACME Org</D.Checkmark>
    <D.Checkmark @selected={{true}}>HCP Design Sandbox</D.Checkmark>
    <D.Footer @hasDivider={{true}}>
      <HdsLinkStandalone
        @icon="list"
        @text="All Organizations"
        @color="secondary"
        @href="#"
      />
    </D.Footer>
  </HdsDropdown>
</template>;

export default LocalComponent;
