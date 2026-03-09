import Component from '@glimmer/component';
import { fn } from '@ember/helper';

import {
  HdsFormSuperSelectSingleField,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

import PowerSelectSelectedOptionSingle from 'website/components/power-select/selected-option-single';

export default class LocalComponent extends Component {
  OPTIONS = [
    {
      size: 'Extra Small',
      description: '2 vCPU | 1 GiB RAM',
      price: '$0.02',
    },
    { size: 'Small', description: '2 vCPU | 2 GiB RAM', price: '$0.04' },
    { size: 'Medium', description: '4 vCPU | 4 GiB RAM', price: '$0.08' },
    { size: 'Large', description: '8 vCPU | 8 GiB RAM', price: '$0.16' },
    {
      size: 'Extra Large',
      description: '16 vCPU | 16 GiB RAM',
      price: '$0.32',
    },
  ];

  SELECTED_OPTION = this.OPTIONS[1];

  <template>
    <HdsFormSuperSelectSingleField
      @onChange={{fn (mut this.SELECTED_OPTION)}}
      @selected={{this.SELECTED_OPTION}}
      @selectedItemComponent={{PowerSelectSelectedOptionSingle}}
      @options={{this.OPTIONS}}
      as |F|
    >
      <F.Label>Size</F.Label>
      <F.Options>
        {{#let F.options as |option|}}
          <HdsTextBody @size="200">
            <div class="doc-super-select-option-rich-header">
              <strong>{{option.size}}</strong>
              <strong>{{option.price}}</strong>
            </div>
            <div>{{option.description}}</div>
          </HdsTextBody>
        {{/let}}
      </F.Options>
    </HdsFormSuperSelectSingleField>
  </template>
}
