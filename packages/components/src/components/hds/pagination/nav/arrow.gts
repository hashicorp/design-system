/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { on } from '@ember/modifier';

import HdsInteractive from '../../interactive/index.gts';
import HdsIcon from '../../icon/index.gts';
import HdsTextBody from '../../text/body.gts';
import hdsLinkToModels from '../../../../helpers/hds-link-to-models.ts';
import hdsLinkToQuery from '../../../../helpers/hds-link-to-query.ts';
import {
  HdsPaginationDirectionValues,
  HdsPaginationDirectionAriaLabelValues,
  HdsPaginationDirectionLabelValues,
} from '../types.ts';

import type { HdsIconSignature } from '../../icon/index.gts';
import type { HdsInteractiveSignature } from '../../interactive/index.gts';
import type {
  HdsPaginationDirections,
  HdsPaginationDirectionAriaLabels,
  HdsPaginationDirectionLabels,
} from '../types.ts';

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

  <template>
    {{#if @disabled}}
      <HdsInteractive
        class={{this.classNames}}
        aria-label={{this.content.ariaLabel}}
        disabled={{true}}
        ...attributes
      >
        <HdsIcon @name={{this.content.icon}} />
        {{#if this.showLabel}}
          <HdsTextBody
            class="hds-pagination-nav__arrow-label"
            @tag="span"
            @size="100"
            @weight="medium"
            aria-hidden="true"
          >
            {{this.content.label}}
          </HdsTextBody>
        {{/if}}
      </HdsInteractive>
    {{else}}
      <HdsInteractive
        class={{this.classNames}}
        @route={{@route}}
        @query={{hdsLinkToQuery @query}}
        @models={{hdsLinkToModels @model @models}}
        @replace={{@replace}}
        {{on "click" this.onClick}}
        aria-label={{this.content.ariaLabel}}
        ...attributes
      >
        <HdsIcon @name={{this.content.icon}} />
        {{#if this.showLabel}}
          <HdsTextBody
            class="hds-pagination-nav__arrow-label"
            @tag="span"
            @size="100"
            @weight="medium"
            aria-hidden="true"
          >
            {{this.content.label}}
          </HdsTextBody>
        {{/if}}
      </HdsInteractive>
    {{/if}}
  </template>
}
