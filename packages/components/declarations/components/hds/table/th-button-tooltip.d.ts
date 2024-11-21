/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsTableThButtonTooltipSignature {
    Args: {
        labelId?: string;
        tooltip: string;
    };
    Element: HTMLButtonElement;
}
export default class HdsTableThButtonTooltip extends Component<HdsTableThButtonTooltipSignature> {
    prefixLabelId: string;
    get tooltip(): string;
    get classNames(): string;
}
//# sourceMappingURL=th-button-tooltip.d.ts.map