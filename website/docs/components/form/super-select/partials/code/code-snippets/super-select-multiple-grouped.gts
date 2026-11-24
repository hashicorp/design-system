import Component from '@glimmer/component';
import { fn } from '@ember/helper';

import { HdsFormSuperSelectMultipleField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  OPTIONS = [
    { groupName: 'Most common', options: ['Kubernetes', 'AWS'] },
    { groupName: 'Others', options: ['CloudWise', 'SWA', 'Other'] },
  ];

  SELECTED_OPTIONS = ['Kubernetes', 'CloudWise'];

  <template>
    <HdsFormSuperSelectMultipleField
      @onChange={{fn (mut this.SELECTED_OPTIONS)}}
      @selected={{this.SELECTED_OPTIONS}}
      @options={{this.OPTIONS}}
      as |F|
    >
      <F.Label>Grouped options</F.Label>
      <F.Options>{{F.options}}</F.Options>
    </HdsFormSuperSelectMultipleField>
  </template>
}
