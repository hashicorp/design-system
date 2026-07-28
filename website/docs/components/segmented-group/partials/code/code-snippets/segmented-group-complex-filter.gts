import Component from '@glimmer/component';
import { fn } from '@ember/helper';

import { HdsSegmentedGroup } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  TYPE_OPTIONS = ['Service', 'Debug service'];

  SELECTED_TYPES = [];

  <template>
    <HdsSegmentedGroup as |SG|>
      <SG.Dropdown as |D|>
        <D.ToggleButton @color="secondary" @text="Health Status" />
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
        @options={{this.TYPE_OPTIONS}}
        @selected={{this.SELECTED_TYPES}}
        @onChange={{fn (mut this.SELECTED_TYPES)}}
        @placeholder="Type"
        as |option|
      >
        {{option}}
      </SG.SuperSelectMultiple>
    </HdsSegmentedGroup>
  </template>
}
