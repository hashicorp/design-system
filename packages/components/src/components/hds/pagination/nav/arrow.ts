/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import {
  HdsPaginationDirectionValues,
  HdsPaginationDirectionAriaLabelValues,
} from '../types.ts';
import type {
  HdsPaginationDirections,
  HdsPaginationDirectionAriaLabels,
} from '../types';
import type { HdsInteractiveSignature } from '../../interactive/index.ts';
import type { IconName } from '@hashicorp/flight-icons/svg';

export const DIRECTIONS: HdsPaginationDirections[] = [
  HdsPaginationDirectionValues.Prev,
  HdsPaginationDirectionValues.Next,
];

interface HdsPaginationControlArrowContent {
  label?: HdsPaginationDirections;
  icon?: IconName;
  ariaLabel?: HdsPaginationDirectionAriaLabels;
}

interface HdsPaginationControlArrowSignature {
  Args: {
    direction: HdsPaginationDirections;
    route?: string;
    models?: Array<string | number>;
    model?: string | number;
    query?: Record<string, string>;
    replace?: boolean;
    disabled?: boolean;
    showLabel?: boolean;
    onClick?: (direction: HdsPaginationDirections) => void;
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsPaginationControlArrowComponent extends Component<HdsPaginationControlArrowSignature> {
  get content(): HdsPaginationControlArrowContent {
    const { direction } = this.args;

    assert(
      `@direction for "Pagination::Nav::Arrow" must be one of the following: ${DIRECTIONS.join(
        ', '
      )}; received: ${direction}`,
      DIRECTIONS.includes(direction)
    );

    let content: HdsPaginationControlArrowContent = {};
    if (direction === 'prev') {
      content = {
        label: HdsPaginationDirectionValues.Prev,
        icon: 'chevron-left',
        ariaLabel: HdsPaginationDirectionAriaLabelValues.Prev,
      };
    }
    if (direction === 'next') {
      content = {
        label: HdsPaginationDirectionValues.Next,
        icon: 'chevron-right',
        ariaLabel: HdsPaginationDirectionAriaLabelValues.Next,
      };
    }

    return content;
  }

  get showLabel(): boolean {
    const { showLabel = true } = this.args;

    return showLabel;
  }

  get classNames(): string {
    const classes = [
      'hds-pagination-nav__control',
      'hds-pagination-nav__arrow',
      `hds-pagination-nav__arrow--direction-${this.args.direction}`,
    ];

    return classes.join(' ');
  }

  @action
  onClick(): void {
    const { onClick } = this.args;

    if (typeof onClick === 'function') {
      onClick(this.args.direction);
    }
  }
}
