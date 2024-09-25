/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
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
        globalActions?: [];
        utilityActions?: [];
    };
    Element: HTMLDivElement;
}
export default class HdsAppHeader extends Component<HdsAppHeaderSignature> {
    isOpen: boolean;
    isDesktop: boolean;
    hasOverflowContent: boolean;
    desktopMQ: MediaQueryList;
    hasA11yRefocus: boolean;
    a11yRefocusSkipTo: string;
    menuContentId: string;
    breakpoint: number;
    desktopMQVal: string;
    constructor(owner: unknown, args: Record<string, never>);
    addEventListeners(): void;
    removeEventListeners(): void;
    get shouldTrapFocus(): boolean;
    get classNames(): string;
    escapePress(event: KeyboardEvent): void;
    onClickToggle(): void;
    updateDesktopVariable(event: MediaQueryListEvent): void;
}
//# sourceMappingURL=index.d.ts.map