/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { HdsInteractiveSignature } from '../../interactive';
export interface HdsAppSideNavListBackLinkSignature {
    Args: HdsInteractiveSignature['Args'] & {
        text: string;
    };
    Element: HdsInteractiveSignature['Element'];
}
declare const HdsAppSideNavListBackLink: import("@ember/component/template-only").TemplateOnlyComponent<HdsAppSideNavListBackLinkSignature>;
export default HdsAppSideNavListBackLink;
//# sourceMappingURL=back-link.d.ts.map