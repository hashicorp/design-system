/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTreeGridThExpandIcons } from './types';
export interface HdsTreeGridThButtonExpandSignature {
    Args: {
        labelId?: string;
        onClick?: () => void;
        isExpanded?: boolean;
    };
    Element: HTMLButtonElement;
}
export default class HdsTreeGridThButtonExpand extends Component<HdsTreeGridThButtonExpandSignature> {
    get icon(): HdsTreeGridThExpandIcons;
    get onClick(): () => void;
    get classNames(): string;
}
//# sourceMappingURL=th-button-expand.d.ts.map