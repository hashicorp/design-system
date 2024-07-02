/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsSideNavListSignature } from '../list/index';
interface PortalSignature {
    Args: {
        target: string;
        renderInPlace?: boolean;
        fallback?: 'inplace';
    };
    Blocks: {
        default: [];
    };
}
export interface HdsSideNavPortalSignature {
    Args: PortalSignature['Args'] & {
        ariaLabel?: string;
        targetName?: string;
    };
    Blocks: HdsSideNavListSignature['Blocks'];
    Element: HTMLDivElement;
}
export default class HdsSideNavPortalComponent extends Component<HdsSideNavPortalSignature> {
}
export {};
//# sourceMappingURL=index.d.ts.map