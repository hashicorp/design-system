/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { HdsInteractiveSignature } from '../interactive/';
import type { HdsLinkColors, HdsLinkIconPositions } from '../link/types.ts';
import type { HdsLinkInlineSignature } from '../link/inline.ts';
import type { HdsIconSignature } from '../icon';
export interface HdsAppFooterLinkSignature {
    Args: HdsInteractiveSignature['Args'] & {
        color?: HdsLinkColors;
        icon?: HdsIconSignature['Args']['name'];
        iconPosition?: HdsLinkIconPositions;
    };
    Blocks: {
        default: [];
    };
    Element: HdsLinkInlineSignature['Element'];
}
declare const HdsAppFooterLink: import("@ember/component/template-only").TemplateOnlyComponent<HdsAppFooterLinkSignature>;
export default HdsAppFooterLink;
//# sourceMappingURL=link.d.ts.map