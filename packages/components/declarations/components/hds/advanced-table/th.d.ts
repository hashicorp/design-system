/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsAdvancedTableHorizontalAlignment, HdsAdvancedTableScope } from './types.ts';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.ts';
export declare const ALIGNMENTS: string[];
export declare const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;
export interface HdsAdvancedTableThSignature {
    Args: {
        align?: HdsAdvancedTableHorizontalAlignment;
        isVisuallyHidden?: boolean;
        scope?: HdsAdvancedTableScope;
        tooltip?: string;
        rowspan?: number;
        colspan?: number;
        isExpandable?: boolean;
        newLabel?: string;
        parentId?: string;
        onClickToggle?: () => void;
        isExpanded?: boolean;
        depth?: number;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsAdvancedTableTh extends Component<HdsAdvancedTableThSignature> {
    labelId: string;
    didInsert(element: HTMLDivElement): void;
    get scope(): HdsAdvancedTableScope;
    get role(): string;
    get align(): HdsAdvancedTableHorizontalAlignment;
    get rowspan(): string;
    get colspan(): string | undefined;
    get paddingLeft(): string | undefined;
    get classNames(): string;
}
//# sourceMappingURL=th.d.ts.map