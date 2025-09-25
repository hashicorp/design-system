import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import ShwLabel from '../../label';

import type { ComponentLike } from '@glint/template';
import type { ShwLabelSignature } from 'showcase/components/shw/label';

import type { Theme } from './index';

export interface ShwCarbonizationComparisonGridItemSignature {
  Args: {
    label?: string;
    theme: Theme;
    scope: 'show' | 'reference';
  };
  Blocks: {
    default: [
      {
        Label?: ComponentLike<ShwLabelSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class ShwCarbonizationComparisonGridItem extends Component<ShwCarbonizationComparisonGridItemSignature> {
  get areaName(): string {
    if (this.args.scope === 'reference') {
      // `hds` is not included in the loop for the references
      return this.args.theme.replace('cds', 'cwc');
    } else {
      return this.args.theme;
    }
  }

  get classNames(): string {
    const classes = ['shw-carbonization-comparison-grid__item'];

    // add a class based on the `@scope` argument
    classes.push(
      `shw-carbonization-comparison-grid__item--scope-${this.args.scope}`,
    );

    // add a class based on `this.area`
    classes.push(
      `shw-carbonization-comparison-grid__item--area-${this.areaName}`,
    );

    return classes.join(' ');
  }

  get carbonTheme(): string | undefined {
    if (this.args.scope === 'reference') {
      return this.args.theme.replace(/^cds-/, '');
    } else {
      return undefined;
    }
  }

  <template>
    <div
      class={{this.classNames}}
      ...attributes
      {{! here we use the custom HDS theming selector/value combination }}
      data-hds-theme={{if (eq @scope "show") @theme}}
      {{! here we use the "standard" Carbon theming selector/value combination }}
      data-carbon-theme={{if (eq @scope "reference") this.carbonTheme}}
    >
      {{#if @label}}
        <ShwLabel>{{@label}}</ShwLabel>
      {{/if}}
      <div class="shw-carbonization-comparison-grid__item-content">
        {{yield (hash Label=ShwLabel)}}
      </div>
    </div>
  </template>
}
