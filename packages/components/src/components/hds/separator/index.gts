/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import { HdsSeparatorSpacingValues } from './types.ts';
import type { HdsSeparatorSpacing } from './types.ts';

export const DEFAULT_SPACING = HdsSeparatorSpacingValues.TwentyFour;
export const SPACING: HdsSeparatorSpacing[] = Object.values(
  HdsSeparatorSpacingValues
);

export interface HdsSeparatorSignature {
  Args: {
    spacing?: HdsSeparatorSpacing;
  };
  Element: HTMLElement;
}

export default class HdsSeparator extends Component<HdsSeparatorSignature> {
  get spacing(): HdsSeparatorSpacing {
    const { spacing = DEFAULT_SPACING } = this.args;

    assert(
      `@spacing for "Hds::Separator" must be one of the following: ${SPACING.join(
        ', '
      )}; received: ${spacing}`,
      SPACING.includes(spacing)
    );

    return spacing;
  }

  get classNames(): string {
    const classes = ['hds-separator'];

    // add a class based on the @spacing argument
    classes.push(`hds-separator--spacing-${this.spacing}`);

    return classes.join(' ');
  }

  <template><hr class={{this.classNames}} ...attributes /></template>
}
