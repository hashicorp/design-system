import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { helper } from '@ember/component/helper';
import { eq, notEq, and } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import ShwCarbonizationTokenPreviewHdsColor from 'showcase/components/shw/carbonization/token-preview/hds-color';

import type { DesignToken } from '../../../../types/design-token';

import TOKENS_RAW from '@hashicorp/design-system-tokens/dist/docs/products/tokens.json';

const tokenShortName = helper(function ([token]: [DesignToken]) {
  return token.name?.replace(/^token-/, '');
});

const ColorCarbonization: TemplateOnlyComponent = <template>
  {{pageTitle "Color - Carbonization"}}

  <ShwTextH1>Color - Carbonization</ShwTextH1>

  <section>
    {{#each TOKENS_RAW as |token|}}
      {{#if (and (eq token.$type "color") (notEq token.name undefined))}}
        <ShwCarbonizationComparisonGrid @label={{tokenShortName token}}>
          <:theming as |T|>
            <ShwCarbonizationTokenPreviewHdsColor
              @mode={{T.theme}}
              @tokenName={{token.name}}
            />
          </:theming>
        </ShwCarbonizationComparisonGrid>
      {{/if}}
    {{/each}}
  </section>
</template>;
export default ColorCarbonization;
