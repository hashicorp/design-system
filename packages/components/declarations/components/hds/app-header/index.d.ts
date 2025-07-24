/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type Owner from '@ember/owner';
export interface HdsAppHeaderSignature {
    Args: {
        breakpoint?: string;
        hasA11yRefocus?: boolean;
        a11yRefocusSkipTo?: string;
        a11yRefocusSkipText?: string;
        a11yRefocusNavigationText?: string;
        a11yRefocusRouteChangeValidator?: string;
        a11yRefocusExcludeAllQueryParams?: boolean;
    };
    Blocks: {
        logo?: [];
        globalActions?: [
            {
                close: () => void;
            }
        ];
        utilityActions?: [
            {
                close: () => void;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsAppHeader extends Component<HdsAppHeaderSignature> {
    private _isOpen;
    private _isDesktop;
    private _hasOverflowContent;
    private _desktopMQ;
    hasA11yRefocus: boolean;
    a11yRefocusSkipTo: string;
    private _menuContentId;
    private _desktopMQVal;
    constructor(owner: Owner, args: Record<string, never>);
    addEventListeners(): void;
    removeEventListeners(): void;
    get shouldTrapFocus(): boolean;
    get classNames(): string;
    escapePress(event: KeyboardEvent): void;
    onClickToggle(): void;
    close(): void;
    updateDesktopVariable(event: MediaQueryListEvent): void;
}
