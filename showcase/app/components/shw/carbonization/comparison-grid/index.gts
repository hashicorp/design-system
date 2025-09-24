import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq } from 'ember-truth-helpers';

import ShwLabel from 'showcase/components/shw/label';
import ShwCarbonizationComparisonGridItem from './item';

export interface ShwCarbonizationComparisonGridSignature {
  Args: {
    label?: string;
    hideThemeLabels?: boolean;
  };
  Blocks: {
    label: [];
    themed: [];
    reference: [];
  };
  Element: HTMLDivElement;
}

export const THEMES = [
  'hds',
  'cds-g0',
  'cds-g10',
  'cds-g90',
  'cds-g100',
] as const;

export type Theme = (typeof THEMES)[number];

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
    <div class="shw-carbonization-comparison-grid" ...attributes>
      {{#if (has-block "themed")}}
        {{#each THEMES as |theme|}}
          <ShwCarbonizationComparisonGridItem
            @scope="show"
            @theme={{theme}}
            @label={{(unless @hideThemeLabels theme)}}
          >
            {{yield to="themed"}}
          </ShwCarbonizationComparisonGridItem>
        {{/each}}
      {{/if}}
      {{#if (has-block "reference")}}
        {{#each THEMES as |theme|}}
          {{#unless (eq theme "hds")}}
            <ShwCarbonizationComparisonGridItem
              @scope="reference"
              @theme={{theme}}
            >
              {{yield to="reference"}}
            </ShwCarbonizationComparisonGridItem>
          {{/unless}}
        {{/each}}
      {{/if}}
    </div>
  </template>;

export default ShwCarbonizationComparisonGrid;
