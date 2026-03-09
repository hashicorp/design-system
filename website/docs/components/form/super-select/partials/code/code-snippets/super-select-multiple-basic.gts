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

  SELECTED_OPTIONS = null;

  <template>
    <HdsFormSuperSelectSingleField
      @onChange={{fn (mut this.SELECTED_OPTIONS)}}
      @selected={{this.SELECTED_OPTIONS}}
      @options={{this.OPTIONS}}
      @searchEnabled={{true}}
      as |F|
    >
      <F.Label>This is the label</F.Label>
      {{! @glint-expect-error }}
      <F.Options>{{F.options}}</F.Options>
    </HdsFormSuperSelectSingleField>
  </template>
}
