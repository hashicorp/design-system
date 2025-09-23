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
      return this.args.theme.replace('cds', 'wc');
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

  get themeSelector(): string {
    if (this.args.scope === 'reference') {
      // TODO! once the theming CSS is ready, update this to use the right CSS selector
      return `data-hds-theme="${this.args.theme}"`;
      // TODO! add here a way for the Carbon web components to be locally themed
    } else {
      return `data-cds-theme="${this.args.theme}"`;
    }
  }

  <template>
    <div
      class={{this.classNames}}
      ...attributes
      {{! TODO! once the theming CSS is ready, update this to use the right CSS selector }}
      data-hds-theme={{if (eq @scope "show") @theme}}
      {{! TODO! add here a way for the Carbon web components to be locally themed }}
      data-cds-theme={{if (eq @scope "reference") @theme}}
    >
      {{#if @label}}
        <ShwLabel>{{@label}}</ShwLabel>
      {{/if}}
      {{yield (hash Label=ShwLabel)}}
    </div>
  </template>
}
