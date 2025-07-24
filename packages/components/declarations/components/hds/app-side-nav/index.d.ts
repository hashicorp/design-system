/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type Owner from '@ember/owner';
export interface HdsAppSideNavSignature {
    Args: {
        isResponsive?: boolean;
        isCollapsible?: boolean;
        isMinimized?: boolean;
        breakpoint?: string;
        onToggleMinimizedStatus?: (arg: boolean) => void;
        onDesktopViewportChange?: (arg: boolean) => void;
    };
    Blocks: {
        default?: [];
    };
    Element: HTMLDivElement;
}
export default class HdsAppSideNav extends Component<HdsAppSideNavSignature> {
    private _isMinimized;
    private _isAnimating;
    private _isDesktop;
    private _body;
    private _bodyInitialOverflowValue;
    private _desktopMQ;
    private _navWrapperBody;
    private _desktopMQVal;
    constructor(owner: Owner, args: HdsAppSideNavSignature['Args']);
    private _setUpBodyElement;
    private _setUpNavWrapperBody;
    addEventListeners(): void;
    removeEventListeners(): void;
    get isResponsive(): boolean;
    get isCollapsible(): boolean;
    get shouldTrapFocus(): boolean;
    get showToggleButton(): boolean;
    get classNames(): string;
    synchronizeInert(): void;
    lockBodyScroll(): void;
    unlockBodyScroll(): void;
    escapePress(event: KeyboardEvent): void;
    toggleMinimizedStatus(): void;
    setTransition(phase: string, event: TransitionEvent): void;
    updateDesktopVariable(event: MediaQueryListEvent): void;
}
