import Component from '@glimmer/component';
import { hash } from '@ember/helper';

import ShwLabel from '../../label';

import type { ComponentLike } from '@glint/template';
import type { ShwLabelSignature } from 'showcase/components/shw/label';

export interface ShwCarbonizationComparisonGridItemSignature {
  Args: {
    area:
      | 'hds'
      | 'cds-g0'
      | 'cds-g10'
      | 'cds-g90'
      | 'cds-g100'
      | 'wc-g0'
      | 'wc-g10'
      | 'wc-g90'
      | 'wc-g100';
    label?: string;
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
  get classNames(): string {
    const classes = ['shw-carbonization-comparison-grid__item'];

    // add a class based on the @area argument
    classes.push(`shw-carbonization-comparison-grid__item--${this.args.area}`);

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      {{#if @label}}
        <ShwLabel>{{@label}}</ShwLabel>
      {{/if}}
      {{yield (hash Label=ShwLabel)}}
    </div>
  </template>
}
