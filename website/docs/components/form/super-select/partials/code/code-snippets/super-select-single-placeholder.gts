import Component from '@glimmer/component';
import { fn } from '@ember/helper';

import { HdsFormSuperSelectSingleField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  OPTIONS = [
    'Oregon (us-west-2)',
    'N. Virginia (us-east-1)',
    'Ireland (eu-west-1)',
    'London (eu-west-2)',
    'Frankfurt (eu-central-1)',
  ];

  SELECTED_OPTION = null;

  <template>
    <HdsFormSuperSelectSingleField
      @onChange={{fn (mut this.SELECTED_OPTION)}}
      @selected={{this.SELECTED_OPTION}}
      @options={{this.OPTIONS}}
      @searchEnabled={{true}}
      @placeholder="Your location"
      as |F|
    >
      <F.Label>Select your location of residence</F.Label>
      {{! @glint-expect-error }}
      <F.Options>{{F.options}}</F.Options>
    </HdsFormSuperSelectSingleField>
  </template>
}
