/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

import type { HdsFormSelectBaseSignature } from '../../form/select/base';

export interface HdsPaginationSizeSelectorSignature {
  Args: {
    pageSizes: number[];
    label?: string;
    selectedSize?: number;
    onChange?: (size: number) => void;
  };
  Element: HTMLDivElement;
}

export default class HdsPaginationSizeSelector extends Component<HdsPaginationSizeSelectorSignature> {
  SizeSelectorId = 'pagination-size-selector-' + guidFor(this);

  get pageSizes(): number[] {
    const { pageSizes } = this.args;

    assert(
      '@pageSizes for "Pagination::SizeSelector" must be defined',
      pageSizes !== undefined
    );

    return pageSizes;
  }

  get selectedSize(): number | undefined {
    const { selectedSize } = this.args;

    assert(
      `@selectedSize for "Pagination::SizeSelector" must one of the @pageSizes provided (${this.pageSizes.join(
        ','
      )}), received ${selectedSize}`,
      selectedSize === undefined || this.pageSizes.includes(selectedSize)
    );

    return selectedSize;
  }

  get label(): string {
    const { label = 'Items per page' } = this.args;

    return label;
  }

  @action
  onChange(e: Event): void {
    const { onChange } = this.args;

    const target = e.target as HdsFormSelectBaseSignature['Element'];

    if (typeof onChange === 'function') {
      onChange(parseInt(target.value));
    }
  }
}
