/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsAppSideNavListSignature } from '../list/index';
export interface HdsAppSideNavPortalSignature {
    Args: {
        ariaLabel?: string;
        targetName?: string;
    };
    Blocks: HdsAppSideNavListSignature['Blocks'];
    Element: HTMLDivElement;
}
declare const HdsAppSideNavPortal: import("@ember/component/template-only").TemplateOnlyComponent<HdsAppSideNavPortalSignature>;
export default HdsAppSideNavPortal;
