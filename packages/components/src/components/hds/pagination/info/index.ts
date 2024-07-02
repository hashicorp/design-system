/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { HdsTextBodySignature } from '../../text/body';

interface HdsPaginationInfoSignature {
  Args: {
    itemsRangeStart: number;
    itemsRangeEnd: number;
    totalItems: number;
    showTotalItems?: boolean;
  };
  Element: HdsTextBodySignature['Element'];
}

export default class HdsPaginationInfoComponent extends Component<HdsPaginationInfoSignature> {
  /**
   * @param showTotalItems
   * @type {boolean}
   * @description Controls the visibility of the total items
   */
  get showTotalItems() {
    return this.args.showTotalItems ?? true;
  }
}
