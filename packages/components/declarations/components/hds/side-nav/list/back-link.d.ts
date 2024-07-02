/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { HdsInteractiveSignature } from '../../interactive/';
export interface HdsSideNavListBackLinkSignature {
    Args: HdsInteractiveSignature['Args'] & {
        text: string;
    };
    Element: HdsInteractiveSignature['Element'];
}
declare const HdsSideNavListBackLinkComponent: import("@ember/component/template-only").TemplateOnlyComponent<HdsSideNavListBackLinkSignature>;
export default HdsSideNavListBackLinkComponent;
//# sourceMappingURL=back-link.d.ts.map