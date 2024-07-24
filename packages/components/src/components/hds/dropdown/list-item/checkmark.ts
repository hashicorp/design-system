/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
import type { HdsInteractiveSignature } from '../../interactive';

interface HdsDropdownListItemCheckmarkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    count?: string | number;
    icon?: FlightIconSignature['Args']['name'];
    selected?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsDropdownListItemCheckmarkComponent extends Component<HdsDropdownListItemCheckmarkSignature> {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = [
      'hds-dropdown-list-item',
      'hds-dropdown-list-item--color-action',
      'hds-dropdown-list-item--variant-checkmark',
    ];

    // add a class based on the @selected argument
    if (this.args.selected) {
      classes.push('hds-dropdown-list-item--variant-checkmark-selected');
    }

    return classes.join(' ');
  }
}
