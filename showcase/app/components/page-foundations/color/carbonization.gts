import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwCarbonizationTokenPreviewColor from 'showcase/components/shw/carbonization/token-preview-color';

import TOKENS_RAW from '@hashicorp/design-system-tokens/dist/docs/products/tokens.json';

export default class ColorCarbonization extends Component {
  get allColorTokens() {
    return TOKENS_RAW.filter((token) => token.$type === 'color');
  }

  <template>
    {{pageTitle "Color - Carbonization"}}

    <ShwTextH1>Color - Carbonization</ShwTextH1>

    <section>
      {{#each this.allColorTokens as |token|}}
        <ShwCarbonizationTokenPreviewColor @token={{token}} />
      {{/each}}
    </section>
  </template>
}
