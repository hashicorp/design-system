/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

export interface ThButtonTooltipSignature {
  Args: {
    labelId: unknown;
    tooltip: unknown;
  };
  Element: HTMLButtonElement;
}

export default class ThButtonTooltipComponent extends Component<ThButtonTooltipSignature> {
  /**
   * Generates a unique ID for the (hidden) "label prefix" <span> element
   *
   * @param prefixLabelId
   */
  prefixLabelId = guidFor(this);

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-table__th-button', 'hds-table__th-button--tooltip'];

    return classes.join(' ');
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    ThButtonTooltip: typeof ThButtonTooltipComponent;
    'th-button-tooltip': typeof ThButtonTooltipComponent;
  }
}
