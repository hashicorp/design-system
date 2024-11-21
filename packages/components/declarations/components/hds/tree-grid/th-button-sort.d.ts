/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTreeGridThSortOrder, HdsTreeGridThSortOrderIcons, HdsTreeGridThSortOrderLabels } from './types.ts';
export interface HdsTreeGridThButtonSortSignature {
    Args: {
        labelId?: string;
        onClick?: () => void;
        sortOrder?: HdsTreeGridThSortOrder;
    };
    Element: HTMLButtonElement;
}
export default class HdsTreeGridThButtonSort extends Component<HdsTreeGridThButtonSortSignature> {
    prefixLabelId: string;
    suffixLabelId: string;
    get icon(): HdsTreeGridThSortOrderIcons;
    get sortOrderLabel(): HdsTreeGridThSortOrderLabels;
    get onClick(): () => void;
    get classNames(): string;
}
//# sourceMappingURL=th-button-sort.d.ts.map