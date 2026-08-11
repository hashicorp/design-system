import Component from '@glimmer/component';
import { fn } from '@ember/helper';

import { HdsSegmentedGroup } from '@hashicorp/design-system-components/components';

const SUPER_SELECT_OPTIONS = [
  'Boundary',
  'Consul',
  'Packer',
  'Terraform',
  'Vault',
  'Waypoint',
];

export default class LocalComponent extends Component {
  SELECTED_SERVICE = null;

  <template>
    <HdsSegmentedGroup @isFullWidth={{true}} @maxWidth="500px" as |SG|>
      <SG.TextInput
        @type="search"
        placeholder="Search services"
        aria-label="Search services"
      />
      <SG.SuperSelectSingle
        @options={{SUPER_SELECT_OPTIONS}}
        @selected={{this.SELECTED_SERVICE}}
        @onChange={{fn (mut this.SELECTED_SERVICE)}}
        @placeholder="Select service"
        @ariaLabel="Select service"
        as |option|
      >
        {{option}}
      </SG.SuperSelectSingle>
      <SG.Button @color="secondary" @text="Apply" />
    </HdsSegmentedGroup>
  </template>
}
