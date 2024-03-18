/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import { getElementId } from '../../../../utils/hds-get-element-id';
import Component from '@glimmer/component';

export default class HdsDropdownListItemRadioComponent extends Component {
  /**
   * Determines the unique ID to assign to the radio control
   */
  get id() {
    return getElementId(this);
  }
}
