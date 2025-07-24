/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsSideNavPortalSignature } from './index';
import type { Registry as Services } from '@ember/service';
export interface HdsSideNavPortalTargetSignature {
    Args: {
        targetName?: HdsSideNavPortalSignature['Args']['targetName'];
    };
    Element: HTMLDivElement;
}
export default class HdsSideNavPortalTarget extends Component<HdsSideNavPortalTargetSignature> {
    router: Services['router'];
    numSubnavs: number;
    lastPanelEl: Element | undefined;
    static get prefersReducedMotionOverride(): boolean;
    prefersReducedMotionMQ: MediaQueryList;
    get prefersReducedMotion(): boolean;
    panelsChanged(portalCount: number): void;
    didUpdateSubnav(element: HTMLElement, [count]: [number]): void;
    animateSubnav(element: HTMLElement, [count]: [number]): void;
}
