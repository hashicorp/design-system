/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

interface HdsPaginationSizeSelectorSignature {
  Args: {
    pageSizes: number[];
    selectedSize?: number;
    label?: string;
    onChange?: (pageSize: number) => void;
  };
  Element: HTMLDivElement;
}

export default class HdsPaginationSizeSelectorComponent extends Component<HdsPaginationSizeSelectorSignature> {
  SizeSelectorId = 'pagination-size-selector-' + guidFor(this);

  get selectedSize(): number | undefined {
    const { pageSizes, selectedSize } = this.args;

    assert(
      `@selectedSize for "Pagination::SizeSelector" must one of the @pageSizes provided (${pageSizes.join(
        ','
      )}), received ${selectedSize}`,
      selectedSize === undefined || pageSizes.includes(selectedSize)
    );

    return selectedSize;
  }

  get label(): string {
    return this.args.label ?? 'Items per page';
  }

  @action
  onChange(event: Event): void {
    const { onChange } = this.args;

    if (typeof onChange === 'function') {
      onChange(parseInt((event.target as HTMLSelectElement).value, 10));
    }
  }
}
