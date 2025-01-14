/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsIconSignature } from '../../icon';
import type { HdsInteractiveSignature } from '../../interactive';
export interface HdsSideNavListLinkSignature {
    Args: HdsInteractiveSignature['Args'] & {
        icon?: HdsIconSignature['Args']['name'];
        text?: string;
        badge?: string;
        count?: string;
        hasSubItems?: boolean;
        isActive?: boolean;
    };
    Blocks: {
        default: [];
    };
    Element: HdsInteractiveSignature['Element'];
}
declare const HdsSideNavListLink: import("@ember/component/template-only").TemplateOnlyComponent<HdsSideNavListLinkSignature>;
export default HdsSideNavListLink;
//# sourceMappingURL=link.d.ts.map