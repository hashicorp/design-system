/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsInteractiveSignature } from '../../interactive/';
export interface HdsSideNavListBackLinkSignature {
    Args: HdsInteractiveSignature['Args'] & {
        text: string;
    };
    Element: HdsInteractiveSignature['Element'];
}
declare const HdsSideNavListBackLink: import("@ember/component/template-only").TemplateOnlyComponent<HdsSideNavListBackLinkSignature>;
export default HdsSideNavListBackLink;
//# sourceMappingURL=back-link.d.ts.map