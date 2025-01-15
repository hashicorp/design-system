/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsTreeGridScopeValues } from './types.ts';
export interface BaseHdsTreeGridTrSignature {
    Args: {
        isExpandable?: boolean;
        willDestroy?: () => void;
        childrenKey?: string;
        data?: Record<string, unknown>;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLTableRowElement;
}
export interface SelectableHdsTreeGridTrArgs extends BaseHdsTreeGridTrSignature {
    Args: BaseHdsTreeGridTrSignature['Args'] & {
        isSelectable: true;
        selectionScope?: HdsTreeGridScopeValues.Row;
        selectionKey: string;
    };
}
export type HdsTreeGridTrSignature = BaseHdsTreeGridTrSignature | SelectableHdsTreeGridTrArgs;
export default class HdsTreeGridTr extends Component<HdsTreeGridTrSignature> {
}
//# sourceMappingURL=tr.d.ts.map