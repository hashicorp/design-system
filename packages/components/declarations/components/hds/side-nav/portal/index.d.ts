/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { HdsSideNavListSignature } from '../list/index';
export interface PortalSignature {
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
declare const HdsSideNavPortal: import("@ember/component/template-only").TemplateOnlyComponent<HdsSideNavPortalSignature>;
export default HdsSideNavPortal;
//# sourceMappingURL=index.d.ts.map