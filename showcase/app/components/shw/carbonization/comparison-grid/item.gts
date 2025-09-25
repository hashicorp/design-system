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
    scope: 'theming' | 'reference';
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

    if (this.args.scope === 'theming') {
      // here we use the custom HDS theming selector
      classes.push(`hds-theme-${this.args.theme}`);
    }

    if (this.args.scope === 'reference') {
      // here we use the web-components specific selector (see: https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/docs/carbon-cdn-style-helpers.mdx#carbon-theme-zoning-classes)
      let selector;
      switch (this.args.theme) {
        case 'cds-g100':
          selector = 'cds-theme-zone-g100';
          break;
        case 'cds-g90':
          selector = 'cds-theme-zone-g90';
          break;
        case 'cds-g10':
          selector = 'cds-theme-zone-g10';
          break;
        default:
          selector = 'cds-theme-zone-white';
          break;
      }
      classes.push(selector);
    }

    // add a class based on `this.area`
    classes.push(
      `shw-carbonization-comparison-grid__item--area-${this.areaName}`,
    );

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      {{#if @label}}
        <ShwLabel>{{@label}}</ShwLabel>
      {{/if}}
      <div class="shw-carbonization-comparison-grid__item-content">
        {{yield (hash Label=ShwLabel)}}
      </div>
    </div>
  </template>
}
