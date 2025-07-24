/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsSideNavListSignature } from '../list/index';
export interface HdsSideNavPortalSignature {
    Args: {
        ariaLabel?: string;
        targetName?: string;
    };
    Blocks: HdsSideNavListSignature['Blocks'];
    Element: HTMLDivElement;
}
declare const HdsSideNavPortal: import("@ember/component/template-only").TemplateOnlyComponent<HdsSideNavPortalSignature>;
export default HdsSideNavPortal;
