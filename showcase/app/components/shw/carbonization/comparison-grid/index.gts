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
    theming: [{ mode: Mode }];
    reference: [{ mode: Mode }];
  };
  Element: HTMLDivElement;
}

export const MODES = [
  'default',
  'cds-g0',
  'cds-g10',
  'cds-g90',
  'cds-g100',
] as const;

export type Mode = (typeof MODES)[number];

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
        {{#each MODES as |mode|}}
          <ShwCarbonizationComparisonGridItem
            @scope="theming"
            @mode={{mode}}
            @label={{(unless @hideThemeLabels mode)}}
          >
            {{yield (hash mode=mode) to="theming"}}
          </ShwCarbonizationComparisonGridItem>
        {{/each}}
      {{/if}}
      {{#if (has-block "reference")}}
        {{#each MODES as |mode|}}
          {{#unless (eq mode "default")}}
            <ShwCarbonizationComparisonGridItem
              @scope="reference"
              @mode={{mode}}
              @label={{(unless @hideCarbonLabels (carbonLabel mode))}}
            >
              {{yield (hash mode=mode) to="reference"}}
            </ShwCarbonizationComparisonGridItem>
          {{/unless}}
        {{/each}}
      {{/if}}
    </div>
  </template>;

export default ShwCarbonizationComparisonGrid;
