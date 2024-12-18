/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsSideNavBaseSignature } from './base';
export interface HdsSideNavSignature {
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
        /**
         * @deprecated The `@ariaLabel` argument for "Hds::SideNav" has been deprecated. It is replaced by aria-labelledby and aria-expanded on the toggle button
         */
        ariaLabel?: string | undefined;
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
export default class HdsSideNav extends Component<HdsSideNavSignature> {
    isAnimating: boolean;
    isDesktop: boolean;
    isMinimized: boolean;
    desktopMQ: MediaQueryList;
    containersToHide: NodeListOf<Element>;
    hasA11yRefocus: boolean;
    a11yRefocusSkipTo: string;
    desktopMQVal: string;
    constructor(owner: unknown, args: HdsSideNavSignature['Args']);
    addEventListeners(): void;
    removeEventListeners(): void;
    get isResponsive(): boolean;
    get isCollapsible(): boolean;
    get shouldTrapFocus(): boolean;
    get showToggleButton(): boolean;
    /**
     * @deprecated The `@ariaLabel` argument for "Hds::SideNav" has been deprecated. It is replaced by aria-labelledby and aria-expanded on the toggle button
     */
    get ariaLabel(): string | undefined;
    get classNames(): string;
    synchronizeInert(): void;
    escapePress(event: KeyboardEvent): void;
    toggleMinimizedStatus(): void;
    didInsert(element: HTMLElement): void;
    setTransition(phase: string, event: TransitionEvent): void;
    updateDesktopVariable(event: MediaQueryListEvent): void;
}
//# sourceMappingURL=index.d.ts.map