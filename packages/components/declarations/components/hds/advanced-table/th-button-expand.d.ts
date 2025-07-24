/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { type HdsAdvancedTableExpandState } from './types.ts';
import type { HdsAdvancedTableThSortExpandIcons } from './types.ts';
export interface HdsAdvancedTableThButtonExpandSignature {
    Args: {
        labelId?: string;
        isExpanded?: HdsAdvancedTableExpandState;
        onToggle?: () => void;
        isExpandAll?: boolean;
    };
    Element: HTMLButtonElement;
}
export default class HdsAdvancedTableThButtonExpand extends Component<HdsAdvancedTableThButtonExpandSignature> {
    private _prefixLabelId;
    get isExpanded(): HdsAdvancedTableExpandState;
    get icon(): HdsAdvancedTableThSortExpandIcons;
    onClick(): void;
    get classNames(): string;
}
