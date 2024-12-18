/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsAppFrameFooterSignature } from './parts/footer.ts';
import type { HdsAppFrameHeaderSignature } from './parts/header.ts';
import type { HdsAppFrameMainSignature } from './parts/main.ts';
import type { HdsAppFrameModalsSignature } from './parts/modals.ts';
import type { HdsAppFrameSidebarSignature } from './parts/sidebar.ts';
export interface HdsAppFrameSignature {
    Args: {
        hasFooter?: boolean;
        hasHeader?: boolean;
        hasMain?: boolean;
        hasModals?: boolean;
        hasSidebar?: boolean;
    };
    Blocks: {
        default: [
            {
                Footer?: ComponentLike<HdsAppFrameFooterSignature>;
                Header?: ComponentLike<HdsAppFrameHeaderSignature>;
                Main?: ComponentLike<HdsAppFrameMainSignature>;
                Modals?: ComponentLike<HdsAppFrameModalsSignature>;
                Sidebar?: ComponentLike<HdsAppFrameSidebarSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsAppFrame extends Component<HdsAppFrameSignature> {
    get hasHeader(): boolean;
    get hasSidebar(): boolean;
    get hasFooter(): boolean;
    get hasModals(): boolean;
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map