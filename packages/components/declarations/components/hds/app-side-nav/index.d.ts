/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsAppSideNavSignature {
    Args: {
        isResponsive?: boolean;
        isCollapsible?: boolean;
        isMinimized?: boolean;
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
    private _containersToHide;
    private _desktopMQVal;
    constructor(owner: unknown, args: HdsAppSideNavSignature['Args']);
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
    didInsert(element: HTMLElement): void;
    setTransition(phase: string, event: TransitionEvent): void;
    updateDesktopVariable(event: MediaQueryListEvent): void;
}
//# sourceMappingURL=index.d.ts.map