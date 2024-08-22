/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
interface HdsPaginationInfoSignature {
  Args: {
    // TODO: Convert this to be the parent arg
    itemsRangeStart: number;
    // TODO: Convert this to be the parent arg
    itemsRangeEnd: number;
    // TODO: Convert this to be the parent arg
    showTotalItems?: boolean;
    totalItems: number;
  };
  Element: HTMLDivElement;
}

export default class HdsPaginationInfoComponent extends Component<HdsPaginationInfoSignature> {
  get showTotalItems() {
    return this.args.showTotalItems ?? true;
  }
}
