/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import type { HdsPaginationDirections } from '../types.ts';
import type { HdsInteractiveSignature } from '../../interactive/index.ts';

export const DIRECTIONS: HdsPaginationDirections[] = ['prev', 'next'];

interface HdsPaginationControlArrowSignature {
  Args: {
    direction: HdsPaginationDirections;
    disabled?: boolean;
    model?: string | number;
    models?: Array<string | number>;
    replace?: boolean;
    route?: string;
    query?: Record<string, string>;
    onClick?: (direction: HdsPaginationDirections) => void;
    showLabel?: boolean;
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
    if (direction === 'prev') {
      content = {
        label: 'Previous',
        icon: 'chevron-left',
        ariaLabel: 'Previous page',
      };
    }
    if (direction === 'next') {
      content = {
        label: 'Next',
        icon: 'chevron-right',
        ariaLabel: 'Next page',
      };
    }

    return content;
  }

  /**
   * @param showLabel
   * @type {boolean}
   * @default true
   * @description Show the labels for the control
   */
  get showLabel(): boolean {
    const { showLabel = true } = this.args;

    return showLabel;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
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
