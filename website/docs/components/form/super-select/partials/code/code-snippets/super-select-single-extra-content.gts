import Component from '@glimmer/component';
import { fn } from '@ember/helper';

import {
  HdsFormSuperSelectSingleField,
  HdsBadge,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

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
      @ariaLabel="Label"
      as |F|
    >
      <F.Label>Target infrastructure
        <HdsBadge @size="small" @text="Beta" /></F.Label>
      <F.HelperText>This is an experimental feature (<HdsLinkInline
          @href="#"
        >read more</HdsLinkInline>).</F.HelperText>
      {{! @glint-expect-error }}
      <F.Options>{{F.options}}</F.Options>
    </HdsFormSuperSelectSingleField>
  </template>
}
