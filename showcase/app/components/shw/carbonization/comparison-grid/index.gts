import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq } from 'ember-truth-helpers';
import { helper } from '@ember/component/helper';
import { hash } from '@ember/helper';

import ShwLabel from 'showcase/components/shw/label';
import ShwCarbonizationComparisonGridItem from './item';

export interface ShwCarbonizationComparisonGridSignature {
  Args: {
    label?: string;
    hideThemeLabels?: boolean;
    hideCarbonLabels?: boolean;
    sideBySide?: boolean;
  };
  Blocks: {
    label: [];
    theming: [{ theme: Theme }];
    reference: [{ theme: Theme }];
  };
  Element: HTMLDivElement;
}

export const THEMES = [
  'default',
  'cds-g0',
  'cds-g10',
  'cds-g90',
  'cds-g100',
] as const;

export type Theme = (typeof THEMES)[number];

const carbonLabel = helper(([hdsLabel]: [string]) => {
  return hdsLabel.replace(/^cds-/, 'carbon/').replace(/g0$/, 'white');
});

const ShwCarbonizationComparisonGrid: TemplateOnlyComponent<ShwCarbonizationComparisonGridSignature> =
  <template>
    {{#if @label}}
      <ShwLabel
        class="shw-carbonization-comparison-grid__top-label"
      >{{@label}}</ShwLabel>
    {{/if}}
    {{#if (has-block "label")}}
      <ShwLabel class="shw-carbonization-comparison-grid__top-label">{{yield
          to="label"
        }}</ShwLabel>
    {{/if}}
    <div
      class="shw-carbonization-comparison-grid
        {{if @sideBySide 'shw-carbonization-comparison-grid--side-by-side'}}"
      ...attributes
    >
      {{#if (has-block "theming")}}
        {{#each THEMES as |theme|}}
          <ShwCarbonizationComparisonGridItem
            @scope="theming"
            @theme={{theme}}
            @label={{(unless @hideThemeLabels theme)}}
          >
            {{yield (hash theme=theme) to="theming"}}
          </ShwCarbonizationComparisonGridItem>
        {{/each}}
      {{/if}}
      {{#if (has-block "reference")}}
        {{#each THEMES as |theme|}}
          {{#unless (eq theme "default")}}
            <ShwCarbonizationComparisonGridItem
              @scope="reference"
              @theme={{theme}}
              @label={{(unless @hideCarbonLabels (carbonLabel theme))}}
            >
              {{yield (hash theme=theme) to="reference"}}
            </ShwCarbonizationComparisonGridItem>
          {{/unless}}
        {{/each}}
      {{/if}}
    </div>
  </template>;

export default ShwCarbonizationComparisonGrid;
