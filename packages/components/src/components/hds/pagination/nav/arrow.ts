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
  HdsPaginationDirectionLabelValues,
} from '../types.ts';

import type { HdsIconSignature } from '../../icon/index.ts';
import type { HdsInteractiveSignature } from '../../interactive';
import type {
  HdsPaginationDirections,
  HdsPaginationDirectionAriaLabels,
  HdsPaginationDirectionLabels,
} from '../types';

interface HdsPaginationControlArrowContent {
  label: HdsPaginationDirectionLabels;
  icon: HdsIconSignature['Args']['name'];
  ariaLabel: HdsPaginationDirectionAriaLabels;
}

interface HdsPaginationControlArrowArgs {
  direction: HdsPaginationDirections;
  disabled?: boolean;
  showLabel?: boolean;
  onClick?: (direction: HdsPaginationDirections) => void;
}

export interface HdsPaginationControlArrowSignature {
  Args: HdsPaginationControlArrowArgs & HdsInteractiveSignature['Args'];
  Element: HdsInteractiveSignature['Element'];
}

export const DIRECTIONS: HdsPaginationDirections[] = [
  HdsPaginationDirectionValues.Prev,
  HdsPaginationDirectionValues.Next,
];

export default class HdsPaginationControlArrow extends Component<HdsPaginationControlArrowSignature> {
  get content(): HdsPaginationControlArrowContent {
    const { direction } = this.args;

    assert(
      `@direction for "Pagination::Nav::Arrow" must be one of the following: ${DIRECTIONS.join(
        ', '
      )}; received: ${direction}`,
      DIRECTIONS.includes(direction)
    );

    const hdsPaginationNavArrowContentDirectionMap: Record<
      HdsPaginationDirections,
      HdsPaginationControlArrowContent
    > = {
      [HdsPaginationDirectionValues.Prev]: {
        label: HdsPaginationDirectionLabelValues.Prev,
        icon: 'chevron-left',
        ariaLabel: HdsPaginationDirectionAriaLabelValues.Prev,
      },
      [HdsPaginationDirectionValues.Next]: {
        label: HdsPaginationDirectionLabelValues.Next,
        icon: 'chevron-right',
        ariaLabel: HdsPaginationDirectionAriaLabelValues.Next,
      },
    };

    return hdsPaginationNavArrowContentDirectionMap[direction];
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
