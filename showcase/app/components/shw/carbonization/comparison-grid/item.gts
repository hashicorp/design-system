import Component from '@glimmer/component';
import { hash } from '@ember/helper';

import ShwLabel from '../../label';

import type { ComponentLike } from '@glint/template';
import type { ShwLabelSignature } from 'showcase/components/shw/label';

import type { Context } from './index';

export interface ShwCarbonizationComparisonGridItemSignature {
  Args: {
    label?: string;
    context: Context;
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
      // `default` is not included in the loop for the references
      return this.args.context.replace('cds', 'cwc');
    } else {
      return this.args.context;
    }
  }

  get classNames(): string {
    const classes = ['shw-carbonization-comparison-grid__item'];

    // add a class based on `this.areaName`
    classes.push(
      `shw-carbonization-comparison-grid__item--area-${this.areaName}`,
    );

    return classes.join(' ');
  }

  get contentClassNames(): string {
    const classes = ['shw-carbonization-comparison-grid__item-content'];

    if (this.args.scope === 'theming') {
      let hdsSelector: string;
      // here we use the HDS theme/mode class selectors
      switch (this.args.context) {
        case 'default':
          hdsSelector = 'hds-theme-default';
          break;
        default:
          hdsSelector = `hds-mode-${this.args.context}`;
          break;
      }
      classes.push(hdsSelector);
    }

    if (this.args.scope === 'reference') {
      // here we use the web-components specific selector (see: https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/docs/carbon-cdn-style-helpers.mdx#carbon-theme-zoning-classes)
      let cdsSelector: string;
      switch (this.args.context) {
        case 'cds-g100':
          cdsSelector = 'cds-theme-zone-g100';
          break;
        case 'cds-g90':
          cdsSelector = 'cds-theme-zone-g90';
          break;
        case 'cds-g10':
          cdsSelector = 'cds-theme-zone-g10';
          break;
        default:
          cdsSelector = 'cds-theme-zone-white';
          break;
      }
      classes.push(cdsSelector);
    }

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      {{#if @label}}
        <ShwLabel
          class="shw-carbonization-comparison-grid__item-label"
        >{{@label}}</ShwLabel>
      {{/if}}
      <div class={{this.contentClassNames}}>
        {{yield (hash Label=ShwLabel)}}
      </div>
    </div>
  </template>
}
