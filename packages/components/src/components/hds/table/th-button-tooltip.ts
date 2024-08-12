/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';

export interface HdsTableThButtonTooltipArgs {
  Args: {
    labelId?: string;
    tooltip: string;
  };
  Element: HTMLButtonElement;
}

export default class HdsTableThButtonTooltipComponent extends Component<HdsTableThButtonTooltipArgs> {
  /**
   * Generates a unique ID for the (hidden) "label prefix" <span> element
   *
   * @param prefixLabelId
   */
  prefixLabelId = guidFor(this);

  get tooltip(): string {
    assert(
      `@tooltip for "HdsTableThButtonTooltip" must be a string`,
      typeof this.args.tooltip === 'string'
    );
    return this.args.tooltip;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-table__th-button', 'hds-table__th-button--tooltip'];

    return classes.join(' ');
  }
}
