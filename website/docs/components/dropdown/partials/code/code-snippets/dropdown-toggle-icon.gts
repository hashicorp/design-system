import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsDropdown } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsDropdown as |D|>
    <D.ToggleIcon
      @icon="more-horizontal"
      @text="Overflow Options"
      @hasChevron={{false}}
    />
    <D.Interactive @route="components">Create</D.Interactive>
    <D.Interactive @route="components">Read</D.Interactive>
    <D.Interactive @route="components">Update</D.Interactive>
    <D.Separator />
    <D.Interactive
      @route="components"
      @icon="trash"
      @color="critical"
    >Delete</D.Interactive>
  </HdsDropdown>
</template>;

export default LocalComponent;
