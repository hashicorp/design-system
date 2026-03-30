import Component from '@glimmer/component';

import { HdsIcon } from '@hashicorp/design-system-components/components';

export interface ShwCarbonizationComparisonGridNoEquivalentSignature {
  Args: {
    isCompact?: boolean;
  };
}

export default class ShwCarbonizationComparisonGridNoEquivalent extends Component<ShwCarbonizationComparisonGridNoEquivalentSignature> {
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
      <span>This component is not available in Carbon</span>
    </div>
  </template>
}
