/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { getElementId } from '../../../../utils/hds-get-element-id.ts';
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
import type { HdsFormCheckboxBaseSignature } from '../../form/checkbox/base.ts';

export interface HdsDropdownListItemCheckboxSignature {
  Args: HdsFormCheckboxBaseSignature['Args'] & {
    count?: string | number;
    icon?: FlightIconSignature['Args']['name'];
  };
  Blocks: {
    default: [];
  };
  Element: HdsFormCheckboxBaseSignature['Element'];
}

export default class HdsDropdownListItemCheckboxComponent extends Component<HdsDropdownListItemCheckboxSignature> {
  /**
   * Determines the unique ID to assign to the checkbox control
   */
  get id(): string {
    return getElementId(this);
  }
}
