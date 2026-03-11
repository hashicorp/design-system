import Component from '@glimmer/component';
import { eq } from 'ember-truth-helpers';
import { helper } from '@ember/component/helper';
import { hash } from '@ember/helper';

import ShwLabel from 'showcase/components/shw/label';
import ShwCarbonizationComparisonGridItem from './item';
import ShwCarbonizationComparisonGridNoEquivalent from './no-equivalent';

export interface ShwCarbonizationComparisonGridSignature {
  Args: {
    label?: string;
    hideThemeLabels?: boolean;
    hideCarbonLabels?: boolean;
    layout?: 'row' | 'column' | 'side-by-side';
  };
  Blocks: {
    label: [];
    theming: [{ context: Context }];
    reference: [
      {
        context: Context;
        NoEquivalent: typeof ShwCarbonizationComparisonGridNoEquivalent;
      },
    ];
  };
  Element: HTMLDivElement;
}

export const CONTEXTS = [
  'default',
  'cds-g0',
  'cds-g10',
  'cds-g90',
  'cds-g100',
] as const;

export type Context = (typeof CONTEXTS)[number];

const carbonLabel = helper(([hdsLabel]: [string]) => {
  return hdsLabel.replace(/^cds-/, 'carbon/').replace(/g0$/, 'white');
});

export default class ShwCarbonizationComparisonGrid extends Component<ShwCarbonizationComparisonGridSignature> {
  get layout(): string {
    return this.args.layout ?? 'row';
  }

  get classNames(): string {
    const classes = ['shw-carbonization-comparison-grid'];

    // add a class based on `this.layout`
    classes.push(`shw-carbonization-comparison-grid--${this.layout}`);

    return classes.join(' ');
  }

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
    <div class={{this.classNames}} ...attributes>
      {{#if (has-block "theming")}}
        {{#each CONTEXTS as |context|}}
          <ShwCarbonizationComparisonGridItem
            @scope="theming"
            @context={{context}}
            @label={{(unless @hideThemeLabels context)}}
          >
            {{yield (hash context=context) to="theming"}}
          </ShwCarbonizationComparisonGridItem>
        {{/each}}
      {{/if}}
      {{#if (has-block "reference")}}
        {{#each CONTEXTS as |context|}}
          {{#unless (eq context "default")}}
            <ShwCarbonizationComparisonGridItem
              @scope="reference"
              @context={{context}}
              @label={{(unless @hideCarbonLabels (carbonLabel context))}}
            >
              {{yield
                (hash
                  context=context
                  NoEquivalent=ShwCarbonizationComparisonGridNoEquivalent
                )
                to="reference"
              }}
            </ShwCarbonizationComparisonGridItem>
          {{/unless}}
        {{/each}}
      {{/if}}
    </div>
  </template>
}
