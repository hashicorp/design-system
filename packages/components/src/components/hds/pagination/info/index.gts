/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';

import HdsTextBody from '../../text/body.gts';

import type { HdsPaginationNumberedSignature } from '../numbered/index.gts';
import type { HdsTextBodySignature } from '../../text/body.gts';
import type HdsIntlService from '../../../../services/hds-intl.ts';

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
  @service declare readonly hdsIntl: HdsIntlService;

  get showTotalItems(): boolean {
    return this.args.showTotalItems ?? true;
  }

  get translatedItemsRange(): string {
    const { itemsRangeStart, itemsRangeEnd, totalItems } = this.args;

    if (this.showTotalItems) {
      return this.hdsIntl.t(
        'hds.components.pagination.info.page-range-with-total',
        {
          itemsRangeStart,
          itemsRangeEnd,
          totalItems,
          default: `${itemsRangeStart}–${itemsRangeEnd} of ${totalItems}`,
        }
      );
    }

    return this.hdsIntl.t('hds.components.pagination.info.page-range', {
      itemsRangeStart,
      itemsRangeEnd,
      default: `${itemsRangeStart}–${itemsRangeEnd}`,
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
