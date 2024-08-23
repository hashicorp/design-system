/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { HdsPaginationNumberedSignature } from '../numbered/index';
interface HdsPaginationInfoSignature {
  Args: {
    itemsRangeStart: number;
    itemsRangeEnd: number;
    showTotalItems?: HdsPaginationNumberedSignature['Args']['showTotalItems'];
    totalItems: HdsPaginationNumberedSignature['Args']['totalItems'];
  };
  Element: HTMLDivElement;
}

export default class HdsPaginationInfoComponent extends Component<HdsPaginationInfoSignature> {
  get showTotalItems(): boolean {
    return this.args.showTotalItems ?? true;
  }
}
