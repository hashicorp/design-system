import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsDropdown,
  HdsButton,
  HdsButtonSet,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsDropdown @height="284px" as |D|>
    <D.ToggleButton @icon="tag" @text="Tags" @color="secondary" />
    <D.Checkbox>access</D.Checkbox>
    <D.Checkbox>homework</D.Checkbox>
    <D.Checkbox>discovery</D.Checkbox>
    <D.Checkbox>memories</D.Checkbox>
    <D.Checkbox>music</D.Checkbox>
    <D.Checkbox>pharell</D.Checkbox>
    <D.Checkbox>punk</D.Checkbox>
    <D.Checkbox>random</D.Checkbox>
    <D.Checkbox>robots</D.Checkbox>
    <D.Checkbox>tag</D.Checkbox>
    <D.Footer @hasDivider={{true}}>
      <HdsButtonSet>
        <HdsButton @text="Apply filters" @isFullWidth={{true}} @size="small" />
        <HdsButton @text="Cancel" @color="secondary" @size="small" />
      </HdsButtonSet>
    </D.Footer>
  </HdsDropdown>
</template>;

export default LocalComponent;
