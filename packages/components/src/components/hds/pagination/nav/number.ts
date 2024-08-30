/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

import type { HdsInteractiveSignature } from '../../interactive';

interface HdsPaginationNavNumberArgs {
  page: number;
  onClick: (page: number) => void;
  isSelected: boolean;
}

interface HdsPaginationNavNumberSignature {
  Args: HdsPaginationNavNumberArgs & HdsInteractiveSignature['Args'];
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsPaginationControlNumber extends Component<HdsPaginationNavNumberSignature> {
  get page(): number {
    const { page } = this.args;

    assert(
      '@page for "Pagination::Nav::Number" must have a valid value',
      page !== undefined
    );

    return page;
  }

  get classNames(): string {
    const classes = [
      'hds-pagination-nav__control',
      'hds-pagination-nav__number',
    ];

    if (this.args.isSelected) {
      classes.push(`hds-pagination-nav__number--is-selected`);
    }

    return classes.join(' ');
  }

  @action
  onClick(): void {
    const { onClick } = this.args;

    if (typeof onClick === 'function') {
      onClick(this.args.page);
    }
  }
}
