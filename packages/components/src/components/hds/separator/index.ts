/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import { HdsSeparatorSpacingValues } from './types.ts';
import type { HdsSeparatorSpacing } from './types.ts';

export const DEFAULT_SPACING = HdsSeparatorSpacingValues.TwentyFour;
export const SPACING: string[] = Object.values(HdsSeparatorSpacingValues);

interface HdsSeparatorSignature {
  Args: {
    spacing?: HdsSeparatorSpacing;
  };
  Element: HTMLElement;
}

export default class HdsSeparatorComponent extends Component<HdsSeparatorSignature> {
  /**
   * Sets the margin for the separator
   * Accepted values: 24, 0
   *
   * @param spacing
   * @type {string}
   * @default 'default'
   */
  get spacing() {
    const { spacing = DEFAULT_SPACING } = this.args;

    assert(
      `@spacing for "Hds::Separator" must be one of the following: ${SPACING.join(
        ', '
      )}; received: ${spacing}`,
      SPACING.includes(spacing)
    );

    return spacing;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-separator'];

    // add a class based on the @spacing argument
    classes.push(`hds-separator--spacing-${this.spacing}`);

    return classes.join(' ');
  }
}
