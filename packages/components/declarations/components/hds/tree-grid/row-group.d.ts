/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTreeGridItem } from './types.ts';
import type { HdsTreeGridSignature } from './index.ts';
export interface HdsTreeGridRowGroupSignature {
    Args: {
        rowData?: HdsTreeGridItem;
        childrenKey?: HdsTreeGridSignature['Args']['childrenKey'];
        identityKey: HdsTreeGridSignature['Args']['identityKey'];
        index: number;
        setSize?: number;
        level?: number;
    };
    Blocks: {
        row?: [];
    };
    Element: HTMLTableRowElement;
}
export default class HdsTreeGridRowGroup extends Component<HdsTreeGridRowGroupSignature> {
    get ariaPosInSet(): number;
    get level(): number;
    get nextLevel(): number;
}
//# sourceMappingURL=row-group.d.ts.map