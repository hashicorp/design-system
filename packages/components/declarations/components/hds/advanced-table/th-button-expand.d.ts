/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsAdvancedTableThSortExpandIcons } from './types.ts';
export interface HdsAdvancedTableThButtonExpandSignature {
    Args: {
        labelId?: string;
    };
    Element: HTMLButtonElement;
}
export default class HdsAdvancedTableThButtonExpand extends Component<HdsAdvancedTableThButtonExpandSignature> {
    isExpanded: boolean;
    prefixLabelId: string;
    suffixLabelId: string;
    get icon(): HdsAdvancedTableThSortExpandIcons;
    onClick(): void;
    get classNames(): string;
}
//# sourceMappingURL=th-button-expand.d.ts.map