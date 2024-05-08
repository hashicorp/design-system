/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

export default class HdsSuperSelectOptionGroupComponent extends Component {
  /**
   * Generates a unique ID for the group title
   * @return {string}
   */
  groupTitleId = 'super-select-group-title-' + guidFor(this);
}
