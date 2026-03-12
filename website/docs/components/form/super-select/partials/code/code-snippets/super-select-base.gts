import Component from '@glimmer/component';
import { fn } from '@ember/helper';

import { HdsFormSuperSelectMultipleBase } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  OPTIONS = [
    'Oregon (us-west-2)',
    'N. Virginia (us-east-1)',
    'Ireland (eu-west-1)',
    'London (eu-west-2)',
    'Frankfurt (eu-central-1)',
  ];

  SELECTED_OPTIONS = [this.OPTIONS[0], this.OPTIONS[1], this.OPTIONS[2]];

  <template>
    <HdsFormSuperSelectMultipleBase
      @onChange={{fn (mut this.SELECTED_OPTIONS)}}
      @selected={{this.SELECTED_OPTIONS}}
      @options={{this.OPTIONS}}
      @searchEnabled={{true}}
      @ariaLabel="Select server preferences"
      as |options|
    >
      {{options}}
    </HdsFormSuperSelectMultipleBase>
  </template>
}
