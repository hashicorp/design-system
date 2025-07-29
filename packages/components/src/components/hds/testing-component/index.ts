/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import { HdsTestingComponentColorValues } from './types.ts';
import type { HdsTestingComponentColors } from './types.ts';

export const DEFAULT_COLOR: HdsTestingComponentColors =
  HdsTestingComponentColorValues.Primary;
export const COLORS: HdsTestingComponentColors[] = Object.values(
  HdsTestingComponentColorValues
);

export interface HdsTestingComponentComponentSignature {
  Args: {
    title?: string;
    description?: string;
    color?: HdsTestingComponentColors;
    isActive?: boolean;
    unusedArgument?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsTestingComponentComponent extends Component<HdsTestingComponentComponentSignature> {
  // Determines the color scheme for the alert.
  get color(): HdsTestingComponentColors {
    const { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::TestingComponent" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  get isActive(): boolean {
    return this.args.isActive ?? false;
  }

  get classNames() {
    const classes = ['hds-testing-component'];

    classes.push(`hds-testing-component--color-${this.color}`);

    if (this.args.isActive) {
      classes.push('hds-testing-component-active');
    }

    return classes.join(' ');
  }
}
