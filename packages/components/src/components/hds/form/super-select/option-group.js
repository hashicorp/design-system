/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

export default class HdsSuperSelectOptionGroupComponent extends Component {
  /**
   * Generates a unique ID for the Group
   * @return {string}
   */
  groupId = 'super-select-group-' + guidFor(this);
}
