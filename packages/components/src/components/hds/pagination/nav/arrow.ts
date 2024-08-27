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
  HdsPaginationDirectionIconValues,
} from '../types.ts';

import type { HdsInteractiveSignature } from '../../interactive';
import type {
  HdsPaginationDirections,
  HdsPaginationDirectionAriaLabels,
  HdsPaginationDirectionLabels,
  HdsPaginationDirectionIcons,
} from '../types';

interface HdsPaginationControlArrowContent {
  label?: HdsPaginationDirectionLabels;
  icon?: HdsPaginationDirectionIcons;
  ariaLabel?: HdsPaginationDirectionAriaLabels;
}

interface HdsPaginationControlArrowArgs {
  direction: HdsPaginationDirections;
  disabled?: boolean;
  showLabel?: boolean;
  onClick?: (direction: HdsPaginationDirections) => void;
}

interface HdsPaginationControlArrowSignature {
  Args: HdsPaginationControlArrowArgs & HdsInteractiveSignature['Args'];
  Element: HdsInteractiveSignature['Element'];
}

export const DIRECTIONS: HdsPaginationDirections[] = [
  HdsPaginationDirectionValues.Prev,
  HdsPaginationDirectionValues.Next,
];

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
    if (direction === HdsPaginationDirectionValues.Prev) {
      content = {
        label: HdsPaginationDirectionLabelValues.Prev,
        icon: HdsPaginationDirectionIconValues.ChevronLeft,
        ariaLabel: HdsPaginationDirectionAriaLabelValues.Prev,
      };
    }
    if (direction === HdsPaginationDirectionValues.Next) {
      content = {
        label: HdsPaginationDirectionLabelValues.Next,
        icon: HdsPaginationDirectionIconValues.ChevronRight,
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
