/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { on } from '@ember/modifier';

import HdsInteractive from '../../interactive/index.gts';
import HdsTextBody from '../../text/body.gts';
import hdsLinkToModels from '../../../../helpers/hds-link-to-models.ts';
import hdsLinkToQuery from '../../../../helpers/hds-link-to-query.ts';

import type { HdsInteractiveSignature } from '../../interactive/index.gts';
import hdsT from '../../../../helpers/hds-t.ts';

interface HdsPaginationNavNumberArgs {
  page: number;
  onClick: (page: number) => void;
  isSelected: boolean;
}

export interface HdsPaginationNavNumberSignature {
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

  <template>
    <HdsInteractive
      class={{this.classNames}}
      @route={{@route}}
      @query={{hdsLinkToQuery @query}}
      @models={{hdsLinkToModels @model @models}}
      @replace={{@replace}}
      {{on "click" this.onClick}}
      ...attributes
      aria-current={{if @isSelected "page" null}}
    >
      <HdsTextBody @tag="span" @size="100" @weight="medium">
        <span class="sr-only">{{hdsT
            "hds.components.pagination.nav.number.screen-reader-label"
            default="page"
          }}</span>
        {{this.page}}
      </HdsTextBody>
    </HdsInteractive>
  </template>
}
