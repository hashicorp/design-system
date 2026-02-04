import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsDropdown,
  HdsButton,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsDropdown as |D|>
    <D.ToggleButton @count="2" @text="Status" @color="secondary" />
    <D.Checkbox @count="4">Failing</D.Checkbox>
    <D.Checkbox @count="2" checked>Active</D.Checkbox>
    <D.Checkbox @count="1">Starting</D.Checkbox>
    <D.Checkbox @count="3" checked>Pending</D.Checkbox>
    <D.Footer @hasDivider={{true}}>
      <HdsButton @text="Apply filters" @isFullWidth={{true}} @size="small" />
    </D.Footer>
  </HdsDropdown>
</template>;

export default LocalComponent;
