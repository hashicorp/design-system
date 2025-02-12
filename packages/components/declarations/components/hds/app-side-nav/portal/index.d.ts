/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsAppSideNavListSignature } from '../list/index';
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
export interface HdsAppSideNavPortalSignature {
    Args: PortalSignature['Args'] & {
        ariaLabel?: string;
        targetName?: string;
    };
    Blocks: HdsAppSideNavListSignature['Blocks'];
    Element: HTMLDivElement;
}
declare const HdsAppSideNavPortal: import("@ember/component/template-only").TemplateOnlyComponent<HdsAppSideNavPortalSignature>;
export default HdsAppSideNavPortal;
//# sourceMappingURL=index.d.ts.map