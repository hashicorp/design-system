import Component from '@glimmer/component';
import { fn } from '@ember/helper';

import { HdsFormSuperSelectSingleField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  OPTIONS = [
    'AIzaSyDaGmWKa4JsXZHjGw7ISLn_3namBGewQe8mVLWwsAawjYr4Rx_Af50DDqtlxmfnc8mVLWws',
    'GmWKa4JsXZHjGw7zaCELgL.0imfnc8mVLWwsAawjYr4RxAf50DDqtlx_BGewQe8mVLWwsAa',
    '3namBGewQe8mVLWwsAawj_19803eb836a_64203a_22528ec4e9f4444_VLWwsAJsXZHjGw7zaCEL',
  ];

  SELECTED_OPTION = this.OPTIONS[1];

  <template>
    <div class="doc-super-select-constrain-width">
      <HdsFormSuperSelectSingleField
        @onChange={{fn (mut this.SELECTED_OPTION)}}
        @selected="API code"
        @options={{this.OPTIONS}}
        @dropdownMaxWidth="25em"
        as |F|
      >
        <F.Label>Choose one</F.Label>
        <F.Options>{{F.options}}</F.Options>
      </HdsFormSuperSelectSingleField>
    </div>
  </template>
}
