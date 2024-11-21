/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsAdvancedTableThSortExpandIcons } from './types.ts';
export interface HdsAdvancedTableThButtonExpandSignature {
    Args: {
        labelId?: string;
        isExpanded?: boolean;
        onToggle?: () => void;
    };
    Element: HTMLButtonElement;
}
export default class HdsAdvancedTableThButtonExpand extends Component<HdsAdvancedTableThButtonExpandSignature> {
    prefixLabelId: string;
    get icon(): HdsAdvancedTableThSortExpandIcons;
    onClick(): void;
    get classNames(): string;
}
//# sourceMappingURL=th-button-expand.d.ts.map