/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsTableThButtonTooltipArgs {
    Args: {
        labelId?: string;
        tooltip: string;
    };
    Element: HTMLButtonElement;
}
export default class HdsTableThButtonTooltip extends Component<HdsTableThButtonTooltipArgs> {
    prefixLabelId: string;
    get tooltip(): string;
    get classNames(): string;
}
//# sourceMappingURL=th-button-tooltip.d.ts.map