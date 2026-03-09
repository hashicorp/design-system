import Component from '@glimmer/component';
import { fn } from '@ember/helper';

import {
  HdsFormSuperSelectMultipleField,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

import PowerSelectSelectedOptionMultiple from 'website/components/power-select/selected-option-multiple';

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

  SELECTED_OPTIONS = [this.OPTIONS[1], this.OPTIONS[2]];

  <template>
    <HdsFormSuperSelectMultipleField
      @onChange={{fn (mut this.SELECTED_OPTIONS)}}
      @selected={{this.SELECTED_OPTIONS}}
      @selectedItemComponent={{PowerSelectSelectedOptionMultiple}}
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
    </HdsFormSuperSelectMultipleField>
  </template>
}
