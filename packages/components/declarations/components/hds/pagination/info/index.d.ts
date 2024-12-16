/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsPaginationNumberedSignature } from '../numbered/index';
import type { HdsTextBodySignature } from '../../text/body';
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
    get showTotalItems(): boolean;
}
//# sourceMappingURL=index.d.ts.map