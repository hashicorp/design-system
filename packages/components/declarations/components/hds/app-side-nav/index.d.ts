/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
interface HdsAppSideNavSignature {
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
    isResponsive: boolean;
    isMinimized: boolean;
    isCollapsible: boolean;
    isAnimating: boolean;
    isDesktop: boolean;
    body: HTMLElement;
    bodyInitialOverflowValue: string;
    desktopMQ: MediaQueryList;
    containersToHide: NodeListOf<Element>;
    desktopMQVal: string;
    constructor(owner: unknown, args: HdsAppSideNavSignature['Args']);
    addEventListeners(): void;
    removeEventListeners(): void;
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
export {};
//# sourceMappingURL=index.d.ts.map