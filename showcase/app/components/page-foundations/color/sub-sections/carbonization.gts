/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import ShwCarbonizationTokenPreviewColor from 'showcase/components/shw/carbonization/token-preview-color';

import TOKENS_RAW from '@hashicorp/design-system-tokens/dist/docs/products/tokens.json';

export default class SubSectionCarbonized extends Component {
  get allColorTokens() {
    return TOKENS_RAW.filter((token) => token.$type === 'color');
  }

  <template>
    {{#each this.allColorTokens as |token|}}
      {{! @glint-ignore - we know all the tokens of type 'color' have values as 'strings' }}
      <ShwCarbonizationTokenPreviewColor @token={{token}} />
    {{/each}}
  </template>
}
