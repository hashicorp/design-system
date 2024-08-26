/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { HdsPaginationDirectionValues } from '../types.ts';

import type { HdsInteractiveSignature } from '../../interactive';
import type { HdsPaginationDirections } from '../types';

export const DIRECTIONS = ['prev', 'next'];

interface HdsPaginationControlArrowSignature {
  Args: {
    direction: HdsPaginationDirections;
    disabled?: boolean;
    showLabel?: boolean;
    onClick?: (direction: HdsPaginationDirections) => void;
    // TODO: Add the rest of the arguments
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsPaginationControlArrowComponent extends Component<HdsPaginationControlArrowSignature> {
  get content() {
    const { direction } = this.args;

    assert(
      `@direction for "Pagination::Nav::Arrow" must be one of the following: ${DIRECTIONS.join(
        ', '
      )}; received: ${direction}`,
      DIRECTIONS.includes(direction)
    );

    let content;
    if (direction === HdsPaginationDirectionValues.Prev) {
      content = {
        label: 'Previous',
        icon: 'chevron-left',
        ariaLabel: 'Previous page',
      };
    }
    if (direction === HdsPaginationDirectionValues.Next) {
      content = {
        label: 'Next',
        icon: 'chevron-right',
        ariaLabel: 'Next page',
      };
    }

    return content;
  }

  get showLabel() {
    const { showLabel = true } = this.args;

    return showLabel;
  }

  get classNames() {
    const classes = [
      'hds-pagination-nav__control',
      'hds-pagination-nav__arrow',
      `hds-pagination-nav__arrow--direction-${this.args.direction}`,
    ];

    return classes.join(' ');
  }

  @action
  onClick() {
    const { onClick } = this.args;

    if (typeof onClick === 'function') {
      onClick(this.args.direction);
    }
  }
}
