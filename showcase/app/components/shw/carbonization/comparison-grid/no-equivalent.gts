import Component from '@glimmer/component';

import { HdsIcon } from '@hashicorp/design-system-components/components';

export interface ShwCarbonizationComparisonGridNoEquivalentSignature {
  Args: {
    isCompact?: boolean;
    entity?: 'component' | 'variant';
  };
}

export default class ShwCarbonizationComparisonGridNoEquivalent extends Component<ShwCarbonizationComparisonGridNoEquivalentSignature> {
  get entity(): string {
    return this.args.entity ?? 'component';
  }

  get classNames(): string {
    const classes = ['shw-carbonization-comparison-grid__no-equivalent'];

    if (this.args.isCompact) {
      classes.push('shw-carbonization-comparison-grid__no-equivalent--compact');
    }

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}}>
      <HdsIcon @name="eye-off" @size="24" />
      <code>No equivalent</code>
      <span>This {{this.entity}} is not available in Carbon</span>
    </div>
  </template>
}
