/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsAppSideNavPortalSignature } from './index';
interface PortalTargetSignature {
    Element: HTMLDivElement;
    Args: {
        name: string;
        multiple?: boolean;
        onChange?: (count: number) => void;
    };
    Blocks: {
        default: [number];
    };
}
import type { Registry as Services } from '@ember/service';
interface HdsAppSideNavPortalTargetSignature {
    Args: PortalTargetSignature['Args'] & {
        targetName?: HdsAppSideNavPortalSignature['Args']['targetName'];
    };
    Element: HTMLDivElement;
}
export default class HdsAppSideNavPortalTarget extends Component<HdsAppSideNavPortalTargetSignature> {
    router: Services['router'];
    private _numSubnavs;
    private _lastPanelEl;
    static get prefersReducedMotionOverride(): boolean;
    private _prefersReducedMotionMQ;
    get prefersReducedMotion(): boolean;
    panelsChanged(portalCount: number): void;
    didUpdateSubnav(element: HTMLElement, [count]: [number]): void;
    animateSubnav(element: HTMLElement, [count]: [number]): void;
}
export {};
//# sourceMappingURL=target.d.ts.map