import Component from '@glimmer/component';
import { fn } from '@ember/helper';

import { HdsFormSuperSelectSingleField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  OPTIONS = [
    { groupName: 'Most common', options: ['Kubernetes', 'AWS'] },
    { groupName: 'Others', options: ['CloudWise', 'SWA', 'Other'] },
  ];

  SELECTED_OPTION = this.OPTIONS[0]?.options[0];

  <template>
    <HdsFormSuperSelectSingleField
      @onChange={{fn (mut this.SELECTED_OPTION)}}
      @selected={{this.SELECTED_OPTION}}
      @options={{this.OPTIONS}}
      as |F|
    >
      <F.Label>Target infrastructure</F.Label>
      <F.HelperText>The target infrastructure is where you want to deploy your
        apps.</F.HelperText>
      <F.Options>{{F.options}}</F.Options>
    </HdsFormSuperSelectSingleField>
  </template>
}
