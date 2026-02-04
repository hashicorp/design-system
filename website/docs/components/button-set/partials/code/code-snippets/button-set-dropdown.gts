import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsButton,
  HdsButtonSet,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsButtonSet>
    <HdsDropdown as |D|>
      <D.ToggleButton @color="secondary" @text="Select an option" />
      <D.Title @text="Title Text" />
      <D.Description @text="Descriptive text goes here." />
      <D.Interactive @href="#">Add</D.Interactive>
      <D.Interactive @href="#">Add More</D.Interactive>
      <D.Interactive @href="#">Add Another Thing Too</D.Interactive>
      <D.Separator />
      <D.Interactive
        @route="components"
        @icon="trash"
        @color="critical"
      >Delete</D.Interactive>
    </HdsDropdown>

    <HdsButton @text="Submit" type="submit" />
  </HdsButtonSet>
</template>;

export default LocalComponent;
