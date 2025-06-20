/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';

import type { HdsPaginationNumberedSignature } from '../numbered/index';
import type { HdsTextBodySignature } from '../../text/body';
import type HdsIntlService from '../../../../services/hds-intl';

export interface HdsPaginationInfoSignature {
  Args: {
    itemsRangeStart: number;
    itemsRangeEnd: number;
    showTotalItems?: HdsPaginationNumberedSignature['Args']['showTotalItems'];
    totalItems: HdsPaginationNumberedSignature['Args']['totalItems'];
  };
  Element: HdsTextBodySignature['Element'];
}

export default class HdsPaginationInfo extends Component<HdsPaginationInfoSignature> {
  @service hdsIntl!: HdsIntlService;

  get showTotalItems(): boolean {
    return this.args.showTotalItems ?? true;
  }

  get translatedItemsRange(): string {
    const { itemsRangeStart, itemsRangeEnd, totalItems } = this.args;

    let translationKey = 'hds.components.pagination.info.page_range';
    let interpolationProps: {
      itemsRangeStart: number;
      itemsRangeEnd: number;
      totalItems?: number;
    } = {
      itemsRangeStart,
      itemsRangeEnd,
    };
    let defaultValue = `${itemsRangeStart}–${itemsRangeEnd}`;

    if (this.showTotalItems) {
      translationKey = 'hds.components.pagination.info.page_range_with_total';
      interpolationProps = {
        ...interpolationProps,
        totalItems,
      };
      defaultValue = `${defaultValue} of ${totalItems}`;
    }

    return this.hdsIntl.t(translationKey, {
      ...interpolationProps,
      default: defaultValue,
    });
  }
}
