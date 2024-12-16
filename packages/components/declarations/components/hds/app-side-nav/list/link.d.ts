/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { HdsIconSignature } from '../../icon';
import type { HdsInteractiveSignature } from '../../interactive';
export interface HdsAppSideNavListLinkSignature {
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
declare const HdsAppSideNavListLink: import("@ember/component/template-only").TemplateOnlyComponent<HdsAppSideNavListLinkSignature>;
export default HdsAppSideNavListLink;
//# sourceMappingURL=link.d.ts.map