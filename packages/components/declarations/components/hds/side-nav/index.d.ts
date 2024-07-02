/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsSideNavBaseSignature } from './base';
interface HdsSideNavSignature {
    Args: {
        isResponsive?: boolean;
        isCollapsible?: boolean;
        isMinimized?: boolean;
        hasA11yRefocus?: boolean;
        a11yRefocusSkipTo?: string;
        a11yRefocusSkipText?: string;
        a11yRefocusNavigationText?: string;
        a11yRefocusRouteChangeValidator?: string;
        a11yRefocusExcludeAllQueryParams?: boolean;
        ariaLabel?: string;
        onToggleMinimizedStatus?: (arg: boolean) => void;
        onDesktopViewportChange?: (arg: boolean) => void;
    };
    Blocks: {
        header?: [
            {
                Header?: HdsSideNavBaseSignature['Blocks']['header'];
                isMinimized?: boolean;
            }
        ];
        body?: [
            {
                Body?: HdsSideNavBaseSignature['Blocks']['body'];
                isMinimized?: boolean;
            }
        ];
        footer?: [
            {
                Footer?: HdsSideNavBaseSignature['Blocks']['footer'];
                isMinimized?: boolean;
            }
        ];
    };
    Element: HdsSideNavBaseSignature['Element'];
}
export default class HdsSideNavComponent extends Component<HdsSideNavSignature> {
    isResponsive: boolean;
    isMinimized: boolean;
    isCollapsible: boolean;
    isAnimating: boolean;
    isDesktop: boolean;
    desktopMQ: MediaQueryList;
    containersToHide: NodeListOf<Element>;
    hasA11yRefocus: boolean;
    desktopMQVal: string;
    constructor(owner: unknown, args: HdsSideNavSignature['Args']);
    addEventListeners(): void;
    removeEventListeners(): void;
    get shouldTrapFocus(): boolean;
    get showToggleButton(): boolean;
    /**
     * @param ariaLabel
     * @type {string}
     * @default 'close menu'
     */
    get ariaLabel(): string;
    get classNames(): string;
    escapePress(event: KeyboardEvent): void;
    toggleMinimizedStatus(): void;
    didInsert(element: HTMLElement): void;
    setTransition(phase: string, event: TransitionEvent): void;
    updateDesktopVariable(event: MediaQueryListEvent): void;
}
export {};
//# sourceMappingURL=index.d.ts.map