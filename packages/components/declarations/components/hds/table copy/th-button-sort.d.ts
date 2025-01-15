/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTableThSortOrder, HdsTableThSortOrderIcons, HdsTableThSortOrderLabels } from './types.ts';
export interface HdsTableThButtonSortSignature {
    Args: {
        labelId?: string;
        onClick?: () => void;
        sortOrder?: HdsTableThSortOrder;
    };
    Element: HTMLButtonElement;
}
export default class HdsTableThButtonSort extends Component<HdsTableThButtonSortSignature> {
    prefixLabelId: string;
    suffixLabelId: string;
    get icon(): HdsTableThSortOrderIcons;
    get sortOrderLabel(): HdsTableThSortOrderLabels;
    get onClick(): () => void;
    get classNames(): string;
}
//# sourceMappingURL=th-button-sort.d.ts.map