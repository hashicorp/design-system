import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsDropdown,
  HdsButton,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsDropdown as |D|>
    <D.ToggleButton @text="Status" @color="secondary" />
    <D.Radio name="status" @count="4">Failing</D.Radio>
    <D.Radio name="status" @count="2" checked>Active</D.Radio>
    <D.Radio name="status" @count="1">Starting</D.Radio>
    <D.Radio name="status" @count="3">Pending</D.Radio>
    <D.Footer @hasDivider={{true}}>
      <HdsButton @text="Apply filters" @isFullWidth={{true}} @size="small" />
    </D.Footer>
  </HdsDropdown>
</template>;

export default LocalComponent;
