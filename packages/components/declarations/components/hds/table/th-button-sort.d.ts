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
    private _prefixLabelId;
    private _suffixLabelId;
    get icon(): HdsTableThSortOrderIcons;
    get sortOrderLabel(): HdsTableThSortOrderLabels;
    get onClick(): () => void;
    get classNames(): string;
}
//# sourceMappingURL=th-button-sort.d.ts.map