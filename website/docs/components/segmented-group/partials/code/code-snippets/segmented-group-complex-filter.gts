import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';

import { HdsSegmentedGroup } from '@hashicorp/design-system-components/components';

const noop = (): void => {};

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsSegmentedGroup as |SG|>
    <SG.Dropdown as |D|>
      <D.ToggleButton @color="secondary" @text="Health status" />
      <D.Checkbox>Passing</D.Checkbox>
      <D.Checkbox>Warning</D.Checkbox>
      <D.Checkbox>Failing</D.Checkbox>
    </SG.Dropdown>
    <SG.Dropdown as |D|>
      <D.ToggleButton @color="secondary" @text="Source" />
      <D.Checkbox>Consul</D.Checkbox>
      <D.Checkbox>Kubernetes</D.Checkbox>
    </SG.Dropdown>
    <SG.SuperSelectMultiple

      @options={{(array "Service" "Debug service")}}
      @placeholder="Type"
      @onChange={{noop}}
      as |option|
    >
      {{option}}
    </SG.SuperSelectMultiple>
  </HdsSegmentedGroup>
</template>;

export default LocalComponent;
