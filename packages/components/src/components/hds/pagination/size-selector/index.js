/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

export default class HdsPaginationSizeSelectorComponent extends Component {
  /**
   * Generates a unique ID for the pageSize select
   *
   * @param SizeSelectorId
   */
  SizeSelectorId = 'pagination-size-selector-' + guidFor(this);

  /**
   * @param pageSizes
   * @type {array of numbers}
   * @description Set the page sizes users can select from.
   */
  get pageSizes() {
    let { pageSizes } = this.args;

    assert(
      '@pageSizes for "Pagination::SizeSelector" must be defined',
      pageSizes !== undefined
    );

    return pageSizes;
  }

  /**
   * @param selectedSize
   * @type integer
   * @description The selected ("current") page size
   */
  get selectedSize() {
    let { selectedSize } = this.args;

    assert(
      `@selectedSize for "Pagination::SizeSelector" must one of the @pageSizes provided (${this.pageSizes.join(
        ','
      )}), received ${selectedSize}`,
      selectedSize === undefined || this.pageSizes.includes(selectedSize)
    );

    return selectedSize;
  }

  /**
   * @param label
   * @type string
   * @default "Items per page"
   * @description The label text for the select
   */
  get label() {
    let { label = 'Items per page' } = this.args;

    return label;
  }

  @action
  onChange(e) {
    let { onChange } = this.args;

    if (typeof onChange === 'function') {
      onChange(parseInt(e.target.value));
    }
  }
}
