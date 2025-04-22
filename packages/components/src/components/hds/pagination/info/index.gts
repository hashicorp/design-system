/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import HdsTextBody from '../../text/body.gts';

import type { HdsPaginationNumberedSignature } from '../numbered/index.gts';
import type { HdsTextBodySignature } from '../../text/body.gts';

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
  get showTotalItems(): boolean {
    return this.args.showTotalItems ?? true;
  }

  <template>
    <HdsTextBody
      class="hds-pagination-info"
      @tag="div"
      @size="100"
      @weight="medium"
      ...attributes
    >
      {{@itemsRangeStart}}–{{@itemsRangeEnd}}
      {{#if this.showTotalItems}}
        of
        {{@totalItems}}
      {{/if}}
    </HdsTextBody>
  </template>
}
