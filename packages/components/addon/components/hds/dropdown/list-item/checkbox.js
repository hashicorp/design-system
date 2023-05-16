/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { getElementId } from '@hashicorp/design-system-components/utils/hds-get-element-id';

export default class HdsDropdownListItemCheckboxComponent extends Component {
  /**
   * Determines the unique ID to assign to the checkbox control
   */
  get id() {
    return getElementId(this);
  }
}
