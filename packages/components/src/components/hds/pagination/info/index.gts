/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { service } from '@ember/service';
import Component from '@glimmer/component';

import type HdsIntlService from '../../../../services/hds-intl';
import type { HdsTextBodySignature } from '../../text/body.gts';
import type { HdsPaginationNumberedSignature } from '../numbered/index.gts';
import HdsTextBody from '../../text/body.gts';

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

    let translationKey: string;
    let defaultValue: string;
    let interpolationProps: object;

    if (this.showTotalItems) {
      translationKey = 'hds.components.pagination.info.page_range_with_total';
      defaultValue = `${itemsRangeStart}–${itemsRangeEnd} of ${totalItems}`;
      interpolationProps = { itemsRangeStart, itemsRangeEnd, totalItems };
    } else {
      translationKey = 'hds.components.pagination.info.page_range';
      defaultValue = `${itemsRangeStart}–${itemsRangeEnd}`;
      interpolationProps = { itemsRangeStart, itemsRangeEnd };
    }

    return this.hdsIntl.t(translationKey, {
      ...interpolationProps,
      default: defaultValue,
    });
  }

  <template>
    <HdsTextBody
      class="hds-pagination-info"
      @tag="div"
      @size="100"
      @weight="medium"
      ...attributes
    >
      {{this.translatedItemsRange}}
    </HdsTextBody>
  </template>
}
